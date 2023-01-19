// create a singleton instance of the PrismaService, allow
// sharing the service throughout the application
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  // By adding PrismaService to the exports array, any module that
  // imports the PrismaModule will have access to PrismaService and
  // can inject it into its own components/services
  exports: [PrismaService],
})
export class PrismaModule {}
