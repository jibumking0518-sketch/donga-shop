from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="동아고등학교 쇼핑몰 API")

class Customer(BaseModel):
    name: str
    email: str
    product: str

customers = []   # 서버를 끄면 사라짐

@app.get("/")
def home(): return {"message": "쇼핑몰 서버 동작 중"}
@app.get("/customers")
def get_customers(): return customers
@app.post("/customers")
def create_customer(customer: Customer):
    customers.append(customer)
    return {"ok": True, "count": len(customers)}

import os
from fastapi import FastAPI
from sqlmodel import SQLModel, Field, Session, create_engine, select

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///shop.db")
engine = create_engine(DATABASE_URL)

class CustomerIn(SQLModel):        # 입력 형식
    name: str; email: str; product: str
class Customer(CustomerIn, table=True):   # DB 표
    id: int | None = Field(default=None, primary_key=True)

SQLModel.metadata.create_all(engine)   # 표 만들기
app = FastAPI(title="동아고등학교 쇼핑몰 API")
# GET / 은 그대로, 아래 두 개만 교체 (다음 장)

@app.get("/customers")
def get_customers():
    with Session(engine) as session:
        return session.exec(select(Customer)).all()

@app.post("/customers")
def create_customer(customer: CustomerIn):
    with Session(engine) as session:
        new = Customer.model_validate(customer)
        session.add(new); session.commit()
        session.refresh(new)
        return new


