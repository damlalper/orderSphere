import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
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
