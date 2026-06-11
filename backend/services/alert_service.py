import logging
from datetime import datetime
# from backend.models.schema import Alert, SessionLocal # Circular import risk if not careful
# We'll use a mocked approach or direct db insert if needed, but for now let's keep it service-layer logic
# that calls the API or DB.

logger = logging.getLogger(__name__)

class AlertService:
    def __init__(self):
        pass

    async def trigger_critical_alert(self, assessment_data):
        """
        Triggers an automated alert for High/Critical risks.
        
        Args:
            assessment_data (dict): Contains risk_score, hazards, location, etc.
        """
        risk_score = assessment_data.get("score", 0)
        risk_level = assessment_data.get("level", "Unknown")
        
        if risk_score < 8.0 and risk_level != "Critical":
            return # No alert needed
            
        logger.warning(f"CRITICAL RISK DETECTED (Score: {risk_score}). Initiating Alert Protocol.")
        
        # 1. Create DB Record (Mock logic for now, or use DB session)
        # In a real app, we'd insert into 'alerts' table here.
        alert_record = {
            "timestamp": datetime.utcnow(),
            "level": "CRITICAL",
            "message": f"High Danger Detected: {', '.join(assessment_data.get('hazards', []))}",
            "supervisor_id": 1 # Default or from context
        }
        
        # 2. Send Notification (Email/SMS simulation)
        self._send_notification(alert_record)
        
        return True

    def _send_notification(self, alert):
        # Simulate sending email/SMS
        logger.info(f"Checking Supervisor Preferences...")
        logger.info(f"🚀 SENDING CRITICAL ALERT TO SUPERVISOR: {alert['message']}")
        # Integration with EmailService or SMS Gateway would go here
