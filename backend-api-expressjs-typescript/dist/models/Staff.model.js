import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
const saltRounds = 10;
const staffSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    password: { type: String, required: true },
    active: { type: Boolean, default: false },
    store_id: { type: Number, required: true },
    manage_id: { type: Number },
    roles: {
        type: [String],
        default: ['staff'],
        enum: ['staff', 'admin', 'superadmin'],
    },
}, {
    timestamps: true,
    versionKey: false,
    toObject: {
        virtuals: true,
        transform: (_doc, ret) => {
            delete ret.password;
            return ret;
        },
    },
});
// ✅ Virtual field: fullName
staffSchema.virtual('fullName').get(function () {
    return `${this.first_name} ${this.last_name}`;
});
// ✅ Hash password trước khi lưu
staffSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    next();
});
export default model('Staff', staffSchema);
