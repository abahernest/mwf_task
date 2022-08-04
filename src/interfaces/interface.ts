
interface controllerOutput{
    code: number,
    data: any
}

interface jwtPayload{
    email: string,
    fullname?: string
}

export {controllerOutput, jwtPayload}