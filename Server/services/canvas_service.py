from sqlalchemy.orm import Session
from models.canvas_model import StackCanvas

def save_canvas_service(
    stack_id: int,
    canvas_data: dict,
    db: Session
):
    existing = db.query(StackCanvas).filter(
        StackCanvas.stack_id == stack_id
    ).first()

    if existing:
        existing.canvas_json = canvas_data
    else:
        canvas = StackCanvas(
            stack_id=stack_id,
            canvas_json=canvas_data
        )
        db.add(canvas)

    db.commit()

    return {
        "status": "success",
        "message": "Canvas saved successfully"
    }



def get_canvas_service(stack_id:int, db:Session):
    canvas = db.query(StackCanvas).filter(StackCanvas.stack_id == stack_id).first()
    if not canvas:
      return {
            "status": "success",
            "data": {
                "nodes": [],
                "edges": [],
                "viewport": {
                    "x": 0,
                    "y": 0,
                    "zoom": 1
                }
            }
        }

    return {
        "status": "success",
        "data": canvas.canvas_json
    }