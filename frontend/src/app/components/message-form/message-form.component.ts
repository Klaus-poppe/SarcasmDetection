import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@app/models';
import { DialogflowService } from '@app/services';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  @Input('message')
  public message : Message;

  @Input('messages')
  private messages : Message[];

 response = ""
  result : any
  texts : string [] = []  
  flag : boolean  = false


  constructor(private data: DialogflowService) { }

  ngOnInit() {
  }

  public sendMessage(): void {
    this.message.timestamp = new Date();
    this.messages.push(this.message);
    this.texts.push(this.message.content)
    this.response = " "
    this.flag = false

    this.data.getResponse(this.texts).subscribe(res => {
    this.result = res['emoji'][0].sort(function(a,b){return a.prob < b.prob}).slice(0,5)
    for (let result of this.result){
      if (result['emoji'] == "😒" || result['emoji'] == "😅" || result['emoji'] == " 💁" || result['emoji'] == "😌")
        this.flag = true
      this.response += result['emoji'] + "  "  
    }
    
    this.messages.push(
      new Message(this.response, 'assets/images/bot.png', new Date())
    )
    this.response = ""

    if(this.flag)
      this.response += "Sarcasm"
    else
      this.response += "no sarcasm"  

    this.texts.pop()  

    this.messages.push(
      new Message(this.response, 'assets/images/bot.png', new Date())
    )

    // if(this.result[0]['prob'] > 1.5){
    //   this.messages.push(
    //     new Message("high confidence", 'assets/images/bot.png', new Date())
    //   )
    // }
    // else if(this.result[0]['prob'] < 1.5 && this.result[0]['prob'] > 0.8){
    //   this.messages.push(
    //     new Message("medium confidence", 'assets/images/bot.png', new Date())
    //   )
    // }else{
    //   this.messages.push(
    //     new Message("Low confidence", 'assets/images/bot.png', new Date())
    //   )
    // }

    console.log(this.result) 

    this.message = new Message('', 'assets/images/user.png');

  },err =>{
      console.error()
    })


  }

}
