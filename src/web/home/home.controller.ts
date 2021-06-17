import { Controller, Get, Render } from '@nestjs/common'

@Controller('')
export class HomeController {
  @Get()
  @Render('./home/views/index')
  home() {
    // nothing to do here
  }
}