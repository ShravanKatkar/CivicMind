from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.config.database import Base

class Worker(Base):
    __tablename__ = "workers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String, unique=True, index=True)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="Field Safety Officer")
    district = Column(String, index=True, nullable=False)  # Maharashtra district
    location = Column(String, nullable=True)  # JSON or string representation (real-time GPS)
    latitude = Column(Float, nullable=True)  # Real-time latitude
    longitude = Column(Float, nullable=True)  # Real-time longitude
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    incidents = relationship("Incident", back_populates="worker")
    assessments = relationship("Assessment", back_populates="worker")

class Supervisor(Base):
    __tablename__ = "supervisors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String, unique=True, index=True)
    password_hash = Column(String, nullable=False)
    district = Column(String, index=True, nullable=False)  # Maharashtra district
    department = Column(String, default="Municipal Corporation")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    alerts = relationship("Alert", back_populates="supervisor")

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    worker_id = Column(Integer, ForeignKey("workers.id"))
    location = Column(String)
    severity = Column(String)
    status = Column(String)
    
    worker = relationship("Worker", back_populates="incidents")

class Assessment(Base):
    __tablename__ = "assessments"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    worker_id = Column(Integer, ForeignKey("workers.id"))
    image_path = Column(String)
    risk_level = Column(String)
    ai_explanation = Column(Text)
    
    worker = relationship("Worker", back_populates="assessments")
    alerts = relationship("Alert", back_populates="assessment")
    feedback = relationship("Feedback", back_populates="assessment", uselist=False)

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    assessment_id = Column(Integer, ForeignKey("assessments.id"))
    supervisor_id = Column(Integer, ForeignKey("supervisors.id"))
    status = Column(String)
    
    assessment = relationship("Assessment", back_populates="alerts")
    supervisor = relationship("Supervisor", back_populates="alerts")

class Feedback(Base):
    __tablename__ = "feedback"
    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"))
    supervisor_feedback = Column(Text)
    accuracy_rating = Column(Integer)
    
    assessment = relationship("Assessment", back_populates="feedback")
