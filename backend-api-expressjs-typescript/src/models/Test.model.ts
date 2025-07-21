import { Schema, model } from 'mongoose';
const testSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    phone: {
        type: String
    }
})
const Test = model('Test', testSchema);
export default Test;