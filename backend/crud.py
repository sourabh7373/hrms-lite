from sqlalchemy.orm import Session
import models

def get_employees(db: Session):
    return db.query(models.Employee).all()

def get_employee_by_employee_id(db: Session, emp_id: str):
    return db.query(models.Employee).filter(models.Employee.employee_id == emp_id).first()

def create_employee(db: Session, employee):
    db_employee = models.Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

def delete_employee(db: Session, emp_id: str):
    employee = get_employee_by_employee_id(db, emp_id)
    if employee:
        db.delete(employee)
        db.commit()
    return employee

def create_attendance(db: Session, attendance):
    record = models.Attendance(**attendance.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

def get_attendance_by_employee(db: Session, emp_id: str):
    return db.query(models.Attendance).filter(models.Attendance.employee_id == emp_id).all()
