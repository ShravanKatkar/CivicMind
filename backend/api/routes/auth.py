"""
Authentication routes for CivicMind AI
Handles registration and login for workers and supervisors
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Literal

from backend.config.database import get_db
from backend.models.schema import Worker, Supervisor
from backend.models.districts import is_valid_district, get_districts
from backend.utils.auth_utils import (
    get_password_hash, 
    verify_password, 
    create_access_token,
    decode_access_token
)

router = APIRouter(prefix="/api/auth", tags=["authentication"])
security = HTTPBearer()

# Pydantic models
class RegisterRequest(BaseModel):
    name: str
    phone: str
    password: str
    role: Literal["worker", "supervisor"]
    district: str

class LoginRequest(BaseModel):
    phone: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

# Helper function to get current user from token
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), 
                      db: Session = Depends(get_db)):
    token = credentials.credentials
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    return payload

# Routes
@router.get("/districts")
async def get_all_districts():
    """Get list of all Maharashtra districts"""
    return {"districts": get_districts()}

@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest, db: Session = Depends(get_db)):
    """Register a new worker or supervisor"""
    
    # Validate district
    if not is_valid_district(request.district):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid district. Must be one of Maharashtra's 36 districts."
        )
    
    # Check if phone already exists
    if request.role == "worker":
        existing = db.query(Worker).filter(Worker.phone == request.phone).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number already registered as worker"
            )
        
        # Create worker
        hashed_password = get_password_hash(request.password)
        new_user = Worker(
            name=request.name,
            phone=request.phone,
            password_hash=hashed_password,
            district=request.district,
            role="Field Safety Officer"
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        user_data = {
            "id": new_user.id,
            "name": new_user.name,
            "phone": new_user.phone,
            "district": new_user.district,
            "role": "worker"
        }
        
    else:  # supervisor
        existing = db.query(Supervisor).filter(Supervisor.phone == request.phone).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number already registered as supervisor"
            )
        
        # Create supervisor
        hashed_password = get_password_hash(request.password)
        new_user = Supervisor(
            name=request.name,
            phone=request.phone,
            password_hash=hashed_password,
            district=request.district,
            department="Municipal Corporation"
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        user_data = {
            "id": new_user.id,
            "name": new_user.name,
            "phone": new_user.phone,
            "district": new_user.district,
            "role": "supervisor"
        }
    
    # Generate token
    token = create_access_token(data=user_data)
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_data
    }

@router.post("/login/worker", response_model=TokenResponse)
async def login_worker(request: LoginRequest, db: Session = Depends(get_db)):
    """Worker login endpoint"""
    
    worker = db.query(Worker).filter(Worker.phone == request.phone).first()
    if not worker or not verify_password(request.password, worker.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid phone number or password"
        )
    
    if not worker.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated"
        )
    
    user_data = {
        "id": worker.id,
        "name": worker.name,
        "phone": worker.phone,
        "district": worker.district,
        "role": "worker",
        "location": worker.location
    }
    
    token = create_access_token(data=user_data)
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_data
    }

@router.post("/login/supervisor", response_model=TokenResponse)
async def login_supervisor(request: LoginRequest, db: Session = Depends(get_db)):
    """Supervisor login endpoint (separate for security)"""
    
    supervisor = db.query(Supervisor).filter(Supervisor.phone == request.phone).first()
    if not supervisor or not verify_password(request.password, supervisor.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid phone number or password"
        )
    
    if not supervisor.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated"
        )
    
    user_data = {
        "id": supervisor.id,
        "name": supervisor.name,
        "phone": supervisor.phone,
        "district": supervisor.district,
        "role": "supervisor"
    }
    
    token = create_access_token(data=user_data)
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_data
    }

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current logged-in user information"""
    return current_user
