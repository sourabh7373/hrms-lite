from sqlalchemy.orm import Session
import models, schemas


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

def create_attendance(db: Session, attendance: schemas.AttendanceCreate):
    # delete existing attendance for same employee & date
    db.query(models.Attendance).filter(
        models.Attendance.employee_id == attendance.employee_id,
        models.Attendance.date == attendance.date
    ).delete()

    # insert new attendance
    new_att = models.Attendance(**attendance.dict())
    db.add(new_att)
    db.commit()
    db.refresh(new_att)
    return new_att



def get_attendance_by_employee(db: Session, emp_id: str):
    return db.query(models.Attendance).filter(models.Attendance.employee_id == emp_id).all()


def get_attendance_by_employee_and_date(db: Session, employee_id: str, date):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id,
        models.Attendance.date == date
    ).first()
