import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "src/common/public/public.decorator";



@Injectable()
export class JWTAuthGuard implements CanActivate {


  constructor(
    private readonly jwtService:JwtService,
    private reflector: Reflector
  ){

  }




  async canActivate(context: ExecutionContext): Promise<boolean> {

        // Verifica si la ruta tiene el flag @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true; // 💡 No proteger esta ruta

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
  
    if(!token) {
      throw new UnauthorizedException("Missing token")
    }

    try {
      
      const payload = await this.jwtService.verifyAsync(token , {
        secret:process.env.JWT_SECRET
      })
      
      request.userId = payload.sub;


    } catch (error) {
      throw new UnauthorizedException("Invalid token")
    }
   

    return true;

    
  }

    private extractTokenFromHeader(request:Request):string | undefined {

        const [type, token] = request.headers['authorization']?.split(' ') || [];

        return type === "Bearer" ? token : undefined
    }
}