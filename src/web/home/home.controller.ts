import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('')
export class HomeController {
  @Get()
  home(@Res() res: Response): void {
    // redirect to either log in or dashboard
    res.redirect('/dashboard/')
  }
}
