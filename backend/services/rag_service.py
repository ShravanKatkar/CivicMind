import chromadb
from backend.utils.vector_db import get_chroma_client
import logging

logger = logging.getLogger(__name__)

class RAGService:
    def __init__(self):
        self.client = get_chroma_client()
        self.collections = {}
        self._load_collections()

    def _load_collections(self):
        try:
            for col_name in ["safety_protocols", "hazard_patterns", "incident_history"]:
                self.collections[col_name] = self.client.get_or_create_collection(name=col_name)
        except Exception as e:
            logger.error(f"Error loading Chroma collections: {e}")

    def retrieve_context(self, query: str, collection_name: str = "safety_protocols", n_results: int = 3):
        """
        Retrieves relevant documents from the specified collection.
        """
        try:
            collection = self.collections.get(collection_name)
            if not collection:
                return []

            results = collection.query(
                query_texts=[query],
                n_results=n_results
            )
            
            # format results
            documents = results['documents'][0] if results['documents'] else []
            return documents
        except Exception as e:
            logger.error(f"RAG Retrieval Error: {e}")
            return []

    def index_document(self, text: str, metadata: dict, collection_name: str = "safety_protocols"):
        """
        Adds a document to the vector database.
        """
        try:
            collection = self.collections.get(collection_name)
            if collection:
                collection.add(
                    documents=[text],
                    metadatas=[metadata],
                    ids=[f"doc_{str(metadata.get('id', 'unknown'))}"]
                )
                return True
        except Exception as e:
            logger.error(f"RAG Index Error: {e}")
            return False
