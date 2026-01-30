import chromadb
from chromadb.config import Settings
import os

# Define collections
COLLECTIONS = [
    "safety_protocols",
    "hazard_patterns",
    "incident_history",
    "location_data",
    "safety_guidelines"
]

def get_chroma_client():
    """
    Returns a persistent ChromaDB client for the project.
    """
    # Use a persistent storage path relative to the project or absolute
    persist_directory = os.path.join(os.getcwd(), "data", "embeddings")
    os.makedirs(persist_directory, exist_ok=True)
    
    client = chromadb.PersistentClient(path=persist_directory)
    return client

def init_collections():
    """
    Initializes required collections if they don't exist.
    """
    client = get_chroma_client()
    existing_collections = [c.name for c in client.list_collections()]
    
    for col_name in COLLECTIONS:
        if col_name not in existing_collections:
            client.create_collection(name=col_name)
            print(f"Created collection: {col_name}")
        else:
            print(f"Collection already exists: {col_name}")

if __name__ == "__main__":
    init_collections()
