import { Document, Types, Schema, model } from 'mongoose';

export interface Car {
  id?: string;
  brand: string;
  name: string;
  year: string;
  price: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type CarModel = Document<unknown, any, Car> &
  Car & {
    _id: Types.ObjectId;
  };

const carSchema = new Schema<Car>(
  {
    brand: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const carsModel = model<Car>('Cars', carSchema);
