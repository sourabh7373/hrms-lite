from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import models, schemas, crud
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/employees", response_model=list[schemas.EmployeeResponse])
def list_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)

@app.post("/employees", response_model=schemas.EmployeeResponse)
def add_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    if crud.get_employee_by_employee_id(db, employee.employee_id):
        raise HTTPException(status_code=409, detail="Employee ID already exists")
    return crud.create_employee(db, employee)

@app.delete("/employees/{employee_id}")
def remove_employee(employee_id: str, db: Session = Depends(get_db)):
    emp = crud.delete_employee(db, employee_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted"}

@app.post("/attendance", response_model=schemas.AttendanceResponse)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    if not crud.get_employee_by_employee_id(db, attendance.employee_id):
        raise HTTPException(status_code=404, detail="Employee not found")
    return crud.create_attendance(db, attendance)

@app.get("/attendance/{employee_id}", response_model=list[schemas.AttendanceResponse])
def get_attendance(employee_id: str, db: Session = Depends(get_db)):
    return crud.get_attendance_by_employee(db, employee_id)
