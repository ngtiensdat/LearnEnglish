import { Injectable } from '@nestjs/common';
import { SendNotificationDto } from './dto/send-notification.dto';

@Injectable()
export class NotificationsService {
  async send(dto: SendNotificationDto) {
    console.log(`Notification to ${dto.toUserId}: ${dto.message}`);
    return { message: 'Notification sent' };
  }
}
