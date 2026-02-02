import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            email: any;
            sub: any;
            role: any;
        };
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            email: string;
            sub: number;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
}
