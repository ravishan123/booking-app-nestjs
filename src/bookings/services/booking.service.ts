import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { Booking, BookingStatus } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.prisma.booking.create({
      data: createBookingDto,
    });
  }

  async findAll(): Promise<Booking[]> {
    return this.prisma.booking.findMany();
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async update(
    id: string,
    updateBookingDto: Partial<CreateBookingDto>,
  ): Promise<Booking> {
    try {
      return await this.prisma.booking.update({
        where: { id },
        data: updateBookingDto,
      });
    } catch (error) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.booking.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
  }
}
