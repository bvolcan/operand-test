import type { FormRules } from "element-plus";
import type { ChangePassword, PasswordRecovery, UserLoginData } from "~/types";

const login = reactive<FormRules<UserLoginData>>({
    email: [
        {
            required: true,
            message: 'Por favor insira um email cadastrado',
            trigger: 'blur'
        },
        {
            type: "email",
            message: 'Por favor insira um email válido',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: 'Por favor insira uma senha válida',
            trigger: 'blur'
        }
    ]
})

const sendEmail = reactive<FormRules<PasswordRecovery>>({
    email: [
        {
            required: true,
            message: 'Por favor insira um email cadastrado',
            trigger: 'blur'
        },
        {
            type: "email",
            message: 'Por favor insira um email válido',
            trigger: 'blur'
        }
    ]
})

function changePassword(pass: string) {
    const passwordValidator = (rule: any, value: any, callback: any) => {
        if (!!value && value !== pass) {
            callback(new Error("As senhas não conferem"))
        }
        else {
            callback()
        }
    }

    return reactive<FormRules<ChangePassword>>({
        password: [
            {
                required: true,
                message: 'Por favor insira uma senha válida',
                trigger: 'blur'
            },
            {
                min: 6,
                message: "É necessário no mínimo 6 caracteres",
                trigger: 'blur'
            }
        ],
        confirmPassword: [
            {
                required: true,
                message: 'Por favor confirme a senha',
                trigger: 'blur'
            },
            {
                min: 6,
                message: "É necessário no mínimo 6 caracteres",
                trigger: 'blur'
            },
            {
                validator: passwordValidator,
                trigger: 'blur'
            }
        ]
    })
}

export default { login, sendEmail, changePassword }