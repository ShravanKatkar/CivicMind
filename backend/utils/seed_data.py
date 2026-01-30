from backend.config.database import SessionLocal, engine, Base
from backend.models.schema import Worker, Incident, Supervisor, Assessment
from backend.utils.vector_db import init_collections
from backend.utils.auth_utils import get_password_hash
import os
from datetime import datetime, timedelta
import random

def seed_data():
    db = SessionLocal()
    
    # Check if data exists
    if db.query(Worker).first():
        print("Data already seeded.")
        return

    print("Seeding data...")
    
    # Default password for all users
    default_password = get_password_hash("password123")
    
    # Create Supervisors
    sup1 = Supervisor(
        name="Vikram Singh", 
        phone="9876543210", 
        department="Sanitation North",
        district="Mumbai City",
        password_hash=default_password
    )
    db.add(sup1)
    db.commit()
    
    # Create Workers
    districts = ["Mumbai City", "Pune", "Nashik", "Nagpur", "Thane"]
    roles = ["Field Safety Officer", "Sanitation Worker", "Machine Operator"]
    
    for i in range(1, 6):
        worker = Worker(
            name=f"Worker {i}",
            phone=f"980000000{i}",
            role=random.choice(roles),
            location="Zone A",
            district=random.choice(districts),
            password_hash=default_password
        )
        db.add(worker)
    db.commit()
    
    # Create Incidents
    workers = db.query(Worker).all()
    severities = ["Low", "Medium", "High", "Critical"]
    statuses = ["Open", "Resolved", "In Progress"]
    
    for _ in range(10):
        incident = Incident(
            timestamp=datetime.utcnow() - timedelta(days=random.randint(0, 30)),
            worker_id=random.choice(workers).id,
            location=f"Site {random.randint(1, 20)}",
            severity=random.choice(severities),
            status=random.choice(statuses)
        )
        db.add(incident)
    
    db.commit()
    print("Database seeded successfully.")
    print("Default password for all users is: password123")

def create_mock_kb():
    kb_path = os.path.join("data", "knowledge_base")
    os.makedirs(kb_path, exist_ok=True)
    
    # Create a dummy safety protocol
    with open(os.path.join(kb_path, "safety_protocol_v1.txt"), "w") as f:
        f.write("civicmind-ai safety protocol: Always wear PPE. Report hazards immediately.\n")
        f.write("1. Check for gas.\n2. Ensure ventilation.\n3. Use harness in confined spaces.")
    
    print("Mock Knowledge Base created.")

if __name__ == "__main__":
    from backend.models.schema import Base
    Base.metadata.create_all(bind=engine)
    seed_data()
    create_mock_kb()
