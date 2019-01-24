const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const request = require('request');
const fs = require('fs');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const Canvas = require("canvas");
const jimp = require("jimp");
let points = {}
var prefix = "#";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});




client.on("message", message => {
    var args = message.content.split(' ').slice(1);
    var msg = message.content.toLowerCase();
    if( !message.guild ) return;
    if( !msg.startsWith( prefix + 'role' ) ) return;
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(' **__ليس لديك صلاحيات__**');
    if( msg.toLowerCase().startsWith( prefix + 'roleremove' ) ){
        if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد سحب منه الرتبة**' );
        if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );
        var role = msg.split(' ').slice(2).join(" ").toLowerCase();
        var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first();
        if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );if( message.mentions.members.first() ){
            message.mentions.members.first().removeRole( role1 );
            return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم سحب من **');
        }
        if( args[0].toLowerCase() == "all" ){
            message.guild.members.forEach(m=>m.removeRole( role1 ))
            return  message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من الكل رتبة**');
        } else if( args[0].toLowerCase() == "bots" ){
            message.guild.members.filter(m=>m.user.bot).forEach(m=>m.removeRole(role1))
            return  message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البوتات رتبة**');
        } else if( args[0].toLowerCase() == "humans" ){
            message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.removeRole(role1))
            return  message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البشريين رتبة**');
        }  
    } else {
        if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد اعطائها الرتبة**' );
        if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );
        var role = msg.split(' ').slice(2).join(" ").toLowerCase();
        var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first();
        if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );if( message.mentions.members.first() ){
            message.mentions.members.first().addRole( role1 );
            return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم اعطاء **');
        }
        if( args[0].toLowerCase() == "all" ){
            message.guild.members.forEach(m=>m.addRole( role1 ))
            return  message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء الكل رتبة**');
        } else if( args[0].toLowerCase() == "bots" ){
            message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
            return  message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البوتات رتبة**');
        } else if( args[0].toLowerCase() == "humans" ){
            message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
            return  message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البشريين رتبة**');
        }
    }
});

	
client.on('ready', function(){
    var ms = 20000 ;    
    var setGame = ['#invite','#help','By Lorans. | 4564 ','V3.0'];    
    var i = -1;    
    var j = 0;    
    setInterval(function (){    
        if( i == -1 ){    
j = 1;    
       }    
        if( i == (setGame.length)-1 ){    
            j = -1;    
      }    
       i = i+j;    
        client.user.setGame(setGame[i],`https://youtu.be/jzUz4ziN4RY`);    
}, ms);    
    
}); 

client.on('message',async message => {
  if(message.content.startsWith("#voice")) {
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('❌ **ليس لديك الصلاحيات الكافية**');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('❌ **ليس معي الصلاحيات الكافية**');
  message.channel.send('✅| **تم عمل الروم بنجاح**');
  message.guild.createChannel(`Voice Online : [ ${message.guild.members.filter(m => m.voiceChannel).size} ]` , 'voice').then(c => {
    console.log(`Voice online channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(() => {
      c.setName(`Voice Online : [ ${message.guild.members.filter(m => m.voiceChannel).size} ]`)
    },1000);
  });
  }
});



client.on('message', message => {
        if (message.content.startsWith("#uptime")) {
    let ms = client.uptime;
    let cd = 24 * 60 * 60 * 1000; // Calc days
    let ch = 60 * 60 * 1000; // Calc hours
    let cm = 60 * 1000; // Calc minutes
    let cs = 1000; // Calc seconds
    let days = Math.floor(ms / cd);
    let dms = days * cd; // Days, in ms
    let hours = Math.floor((ms - dms) / ch);
    let hms = hours * ch; // Hours, in ms
    let minutes = Math.floor((ms - dms - hms) / cm);
    let mms = minutes * cm; // Minutes, in ms
    let seconds = Math.round((ms - dms - hms - mms) / cs);
    if (seconds === 60) {
        minutes++; // Increase by 1
        seconds = 0;
    }
    if (minutes === 60) {
        hours++; // Inc by 1
        minutes = 0;
    }
    if (hours === 24) {
        days++; // Increase by 1
        hours = 0;
    }
    let dateStrings = [];

    if (days === 1) {
        dateStrings.push('**1** day');
    } else if (days > 1) {
        dateStrings.push('**' + String(days) + '** days');
    }

    if (hours === 1) {
        dateStrings.push('**1** hour');
    } else if (hours > 1) {
        dateStrings.push('**' + String(hours) + '** hours');
    }

    if (minutes === 1) {
        dateStrings.push('**1** minute');
    } else if (minutes > 1) {
        dateStrings.push('**' + String(minutes) + '** minutes');
    }

    if (seconds === 1) {
        dateStrings.push('**1** second');
    } else if (seconds > 1) {
        dateStrings.push('**' + String(seconds) + '** seconds');
    }

    let dateString = '';
    for (let i = 0; i < dateStrings.length - 1; i++) {
        dateString += dateStrings[i];
        dateString += ', ';
    }
    if (dateStrings.length >= 2) {
        dateString = dateString.slice(0, dateString.length - 2) + dateString.slice(dateString.length - 1);
        dateString += 'and ';
    }
    dateString += dateStrings[dateStrings.length - 1];
    message.channel.send(dateString);
}
});


client.on('message', message => {
  
if (message.content.startsWith('#perm')) {
         if(!message.channel.guild) return;
         var perms = JSON.stringify(message.channel.permissionsFor(message.author).serialize(), null, 4);
         var zPeRms = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(':tools: Permissions')
         .addField('Your Permissions:',perms)
                  message.channel.send({embed:zPeRms});

    }
});


client.on('message', function(message) {
    if(message.content.startsWith('#roll')) {
        let args = message.content.split(" ").slice(1);
        if (!args[0]) {
            message.channel.send('**حط رقم معين يتم السحب منه**');
            return;
            }
    message.channel.send(Math.floor(Math.random() * args.join(' ')));
            if (!args[0]) {
          message.edit('1')
          return;
        }
    }
});

	

client.on('message', message => {
if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'move')) {
 if (message.member.hasPermission("MOVE_MEMBERS")) {
 if (message.mentions.users.size === 0) {
 return message.channel.send("``لاستخدام الأمر اكتب هذه الأمر : " +prefix+ "move [USER]``")
}
if (message.member.voiceChannel != null) {
 if (message.mentions.members.first().voiceChannel != null) {
 var authorchannel = message.member.voiceChannelID;
 var usermentioned = message.mentions.members.first().id;
var embed = new Discord.RichEmbed()
 .setTitle("Succes!")
 .setColor("#000000")
 .setDescription(`لقد قمت بسحب <@${usermentioned}> الى الروم الصوتي الخاص بك✅ `)
var embed = new Discord.RichEmbed()
.setTitle(`You are Moved in ${message.guild.name}`)
 .setColor("RANDOM")
.setDescription(`**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`)
 message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed))
message.guild.members.get(usermentioned).send(embed)
} else {
message.channel.send("``لا تستطيع سحب "+ message.mentions.members.first() +" `يجب ان يكون هذه العضو في روم صوتي`")
}
} else {
 message.channel.send("**``يجب ان تكون في روم صوتي لكي تقوم بسحب العضو أليك``**")
}
} else {
message.react("❌")
}
 }
});

	
	client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = msg.content.split(" ").slice(1);

    if(command === "clear") {
        const emoji = client.emojis.find("name", "wastebasket")
    let textxt = args.slice(0).join("");
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
    if (textxt == "") {
        msg.delete().then
    msg.channel.send("**```ضع عدد الرسائل التي تريد مسحها ```**").then(m => m.delete(3000));
} else {
    msg.delete().then
    msg.delete().then
    msg.channel.bulkDelete(textxt);
        msg.channel.send("```php\nعدد الرسائل التي تم مسحها: " + textxt + "\n```").then(m => m.delete(3000));
        }    
    }
}
});	 


const ms = require("ms");
  client.on("message", message => {
 if(!message.channel.guild) return;  
  if (message.author.bot) return;
 
  let command = message.content.split(" ")[0];
 
  if (message.content.split(" ")[0].toLowerCase() === prefix + "unmute") {
        if (!message.member.hasPermission('MANAGE_ROLES')) return;
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!muteRole) return message.reply(" I Can’t Find 'Muted' Role ").catch(console.error).then(message => message.delete(4000))
  if (message.mentions.users.size < 1) return message.reply(' Error : ``Mention a User``').catch(console.error).then(message => message.delete(4000))
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return;
 
  if (message.guild.member(user).removeRole(muteRole.id)) {
      return message.reply("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
  } else {
    message.guild.member(user).removeRole(muteRole).then(() => {
      return message.reply("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
    });
  }
 
};
 
});
 
 
client.on('message',function(message) {
 if(!message.channel.guild) return;    let messageArray = message.content.split(' ');
    let muteRole =  message.guild.roles.find('name', 'Muted');
    let muteMember = message.mentions.members.first();
    let muteReason = messageArray[2];
    let muteDuration = messageArray[3];
 if (message.content.split(" ")[0].toLowerCase() === prefix + "mute") {
           
  if (message.author.bot) return;
       if(!muteRole) return message.guild.createRole({name: 'Muted'}).then(message.guild.channels.forEach(chan => chan.overwritePermissions(muteRole, {SEND_MESSAGES:false,ADD_REACTIONS:false})));
       if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.channel.send(' Error : You Need `` MANAGE_ROLES ``Permission ');
       if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(' Error : I Don’t Have `` MANAGE_ROLES ``Permission ');
       if(!muteMember) return message.channel.send(' Error : ``Mention a User``').then(message => message.delete(4000))
       message.channel.send(`${muteMember} Has Been Muted.`).then(message => message.delete(5000))
       muteMember.addRole(muteRole);
       muteMember.setMute(true)
       .then(() => { setTimeout(() => {
           muteMember.removeRole(muteRole)
           muteMember.setMute(false)
       }, mmss(muteDuration));
       });
   }
});



const devs = ["525435533770620928"];
const adminprefix = ["Dv"];
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!devs.includes(message.author.id)) return;
      
  if (message.content.startsWith('(prefix))ply')) {
    client.user.setGame(argresult);
      message.channel.send(`**✅   ${argresult}**`)
  } else 
     if (message.content === ("leave")) {
    message.guild.leave();        
  } else  
  if (message.content.startsWith('(prefix)wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else 
  if (message.content.startsWith('(prefix)ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else 
  if (message.content.startsWith('(prefix)st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.send(`**✅**`)
  }
  if (message.content.startsWith('(prefix)name')) {
  client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith('(prefix)avatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});


client.on('message', message => {
    if (message.author.bot) return;
     if (message.content ==="#help") {
		 message.channel.send('**تم ارسالك في الخاص**');
            
	
		 


 message.author.sendMessage(`**
╭━━━╮╱╱╭━━╮╱╱╱╭╮
╰╮╭╮┃╱╱┃╭╮┃╱╱╭╯╰╮
╱┃┃┃┣╮╭┫╰╯╰┳━┻╮╭╯
╱┃┃┃┃╰╯┃╭━╮┃╭╮┃┃
╭╯╰╯┣╮╭┫╰━╯┃╰╯┃╰╮
╰━━━╯╰╯╰━━━┻━━┻━╯

   اداريه اوامر


  #kick <mention >  لطرد عضو
  #mute < mention >  اسكات عضو 
  #clear   لتنضيف المحادثة (fixing)
  #role  لتعطي لشخص رتبه او للكل
  #cv <name>  صنع روم صوتية
  #ct <name>  صنع روم كتابية
  #unmute <mention>  فك الاسكات من العضو
  #bc <message>  لارسال رسالة لجميع اعضاء السيرفر
  #move ➾ لسحب العضو الي الروم الصوتي
  #voice <name>  عمل روم فيوس اونلين

  عامه اوامر 


  #roles ➾لعمل رتب كمله للسرفر
  #roll <number> ➾ قرعة
  #avatar ➾ شعار حسابك
  #new ➾فتح تزكره 
  #id ➾ اي دي
  #date ➾ التاريخ
  #bot ➾ معلومات البوت
  #server ➾ معلومات السيرفر


  اخرى 
  welcome :  الترحيب امر لتفعيل
  #invite  : لدعوة البوت الى سيرفرك
  #ping  : لمعرفة سرعة استجابة البوت في الوقت الحالي
  #support  : سيرفر الدعم الفني

**


`);

    }
});

client.on('message', message => {
    if (message.content.startsWith("رابط")) {
     if(!message.channel.guild) return;
if (message.author.bot) return;
        message.channel.createInvite({
        thing: true,
        maxUses: 2,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
    const Embed11 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription("تم ارسالك في الخاص")
   .setFooter("اسم سيررك ",'رابط صوره سيرفرك')
                   .setTimestamp()
				message.channel.send('** تم أرسال الرابط برسالة خاصة **');


      message.channel.sendEmbed(Embed11).then(message => {message.delete(3000)})
      message.author.sendEmbed(Embed11)
    }
});

client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === "#invite") {


 message.author.sendMessage(`

**بامكانك دعوة البوت من هنا

https://discordapp.com/api/oauth2/authorize?client_id=533070826011099146&permissions=8&scope=bot

**
`);

message.channel.send('**تم الارسال في الخاص**');

    }
});

client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === "#support") {


 message.author.sendMessage(`**
Server Support : https://discord.gg/hDeK9TP
**
`);

message.channel.send('**تم الارسال في الخاص**');

    }
});


client.on('message', function(msg) {
    if(msg.content.startsWith ('#server')) {
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`Showing Details Of  **${msg.guild.name}*`)
      .addField('** نوع السيرفر**',`[** __${msg.guild.region}__ **]`,true)
      .addField('** الرتب**',`[** __${msg.guild.roles.size}__ **]`,true)
      .addField('** عدد الاعضاء**',`[** __${msg.guild.memberCount}__ **]`,true)
      .addField('** عدد الاعضاء الاونلاين**',`[** __${msg.guild.members.filter(m=>m.presence.status == 'online').size}__ **]`,true)
      .addField('** الرومات الكتابية**',`[** __${msg.guild.channels.filter(m => m.type === 'text').size}__** ]`,true)
      .addField('** رومات الصوت**',`[** __${msg.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true)
      .addField('** الأونـر**',`**${msg.guild.owner}**`,true)
      .addField('** ايدي السيرفر**',`**${msg.guild.id}**`,true)
      .addField('** تم عمل السيرفر في**',msg.guild.createdAt.toLocaleString())
      msg.channel.send({embed:embed});
    }
  });


client.on("message", message => {
    if (message.content.startsWith("#bc")) {
                 if (!message.member.hasPermission("ADMINISTRATOR"))  return;
  let args = message.content.split(" ").slice(1);
  var argresult = args.join(' ');
  message.guild.members.filter(m => m.presence.status !== 'all').forEach(m => {
  m.send(`${argresult}\n ${m}`);
  })
  message.channel.send(`\`${message.guild.members.filter( m => m.presence.status !== 'all').size}\`:mailbox:  عدد المستلمين `);
  message.delete();
  };
  });



client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
  
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
  
    let args = message.content.split(" ").slice(1);
  
  // -say
    if (command === "say") {
            message.delete()
      message.channel.sendMessage(args.join(" ")).catch(console.error);
    }
    
   
  
  if (command == "embed") {
      let say = new Discord.RichEmbed()
      .setDescription(args.join("  "))
      .setColor(0x23b2d6)
      message.channel.sendEmbed(say);
      message.delete();
    }
  
  
  });


  client.on('message', (message) => {
    if (message.content.startsWith('#kick')) {
        var member= message.mentions.members.first();
        member.kick().then((member) => {
            message.channel.send(member.displayName + ' **keeck from the server ! :airplane:  **');
        }).catch(() => {
            message.channel.send("Error :_:");
        });
    }
}); 
 
 
 




client.on('message', (message) => {
    if (message.content.startsWith('#ban ')) {
      if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('هذا الخاصية للدارة فقط');
        var member= message.mentions.members.first();
        member.ban().then((member) => {
         message.channel.send(member.displayName + ' **bann from the server ! :airplane:  **');
        }).catch(() => {
            message.channel.send('Error :_:');
        });
    }
});







client.on("message", message => {    
          if(!message.channel.guild) return;
   if(message.author.bot) return;
      if(message.content === "#avatar server"){ 
          const embed = new Discord.RichEmbed()
  
      .setTitle(`صورة ** ${message.guild.name} **`)
  .setAuthor(message.author.username, message.guild.iconrURL)
    .setColor('RANDOM')
    .setImage(message.guild.iconURL)

   message.channel.send({embed});
      }
  });


client.on('message', message => {
     if (message.content === "#bot") {
            if(!message.channel.guild) return message.reply('** This command only for servers **');
     let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField("**عدد السيرفرات الي فيها البوت:**" , client.guilds.size)
  .addField("**المستخدمين:**", client.users.size)
  .addField("**قنوات:**", client.channels.size)
  .setTimestamp()
message.channel.sendEmbed(embed);
    }
});

client.on('message', message => {
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith('#bcbot')){
 if(!message.author.id === '520629080333352976') return;
message.channel.sendMessage('تم , جار أرسال الرسالة')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
})
    
            
	     







client.on('message', message => {
    if (message.content === "#date") {
        var currentTime = new Date(),
            السنة = currentTime.getFullYear(),
            الشهر = currentTime.getMonth() + 1,
            اليوم = currentTime.getDate();
        message.channel.sendMessage( "التاريخ : " + اليوم + "-" + الشهر + "-" +السنة)
    }
});

  
client.on("message", (message) => {
if (message.content.startsWith("#ct")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'text');
message.channel.sendMessage('تـم إنـشاء روم كـتابـي')

}
});


client.on("message", (message) => {
if (message.content.startsWith("#cv")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'voice');
    message.channel.sendMessage('تـم إنـشاء روم صـوتي')
    
}
});

client.on('message' , message => {
    ;
    if(message.author.bot) return;
    if(message.content.startsWith(prefix + "ping")) {
   message.channel.send('Pong...').then((msg) => {
        msg.edit(`\`\`\`javascript\nTime taken: ${msg.createdTimestamp - message.createdTimestamp} ms.\nDiscord API: ${Math.round(client.ping)} ms.\`\`\``);
   })
    }  
   });


client.on('message', message => {
    if (message.content.startsWith("#avatar")) {
        var mentionned = message.mentions.users.first();
    var x5bzm;
      if(mentionned){
          var x5bzm = mentionned;
      } else {
          var x5bzm = message.author;
          
      }
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setImage(`${x5bzm.avatarURL}`)
      message.channel.sendEmbed(embed);
    }
});

client.on('message', message => { 
           if (message.content.startsWith(prefix + "id")) {
     var args = message.content.split(" ").slice(1);
     let user = message.mentions.users.first();
     var men = message.mentions.users.first();
        var heg;
        if(men) {
            heg = men
        } else {
            heg = message.author
        }
      var mentionned = message.mentions.members.first();
         var h;
        if(mentionned) {
            h = mentionned
        } else {
            h = message.member
        }
               moment.locale('ar-TN');
      var id = new  Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL) 
    .setColor("#707070")
    .addField(': دخولك لديسكورد قبل', `${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm:ss')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\`` ,true) 
    .addField(': انضمامك لسيرفر قبل', `${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')} \n \`${moment(h.joinedAt).fromNow()}\``, true)               
    .setFooter(`${m.tag}`, 'https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif')                                 
    .setThumbnail(heg.avatarURL);
    message.channel.send(id)
}      
});

client.on('message', message => {
    if (message.content === "#roles") {
    if(!message.channel.guild) return message.channel.send('**This Command Only For Servers !**')
            if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`**${message.author.username} You Dont Have** ``MANAGE_ROLES`` **Premission**`);

                     message.guild.createRole({ name: "~~~~~~الادارة العليا~~~~~~", color: "#c73939", permissions: [] })
                     message.guild.createRole({ name: "The One", color: "#000000", permissions: [] })
                     message.guild.createRole({ name: "The Two", color: "#000000", permissions: [] })
                     message.guild.createRole({ name: "President", color: "#000000", permissions: [] })
                     message.guild.createRole({ name: "Vice prediesnt", color: "#000000", permissions: [] })
                     message.guild.createRole({ name: "~~~~~~~~الادارة~~~~~~~~~~", color: "#c73939", permissions: [] })
                     message.guild.createRole({ name: "Founder", color: "#000000", permissions: [] })
                     message.guild.createRole({ name: "Co Founder", color: "#000000", permissions: [] })
                     message.guild.createRole({ name: "VIP+", color: "#000000", permissions: [] })
                     message.guild.createRole({ name: "VIP", color: "#000000", permissions: [] })
                     message.guild.createRole({ name: "~~~~رتب البوتات~~~~", color: "#c73939", permissions: [] })
                     message.guild.createRole({ name: "Bot", color: "#000000", permissions: [] })
		     message.guild.createRole({ name: "Music", color: "#000000", permissions: [] })
		     message.guild.createRole({ name: "~~~~~~~~~ادمنية جدد~~~~~~~~~~~", color: "#c73939", permissions: [] })					 
		     message.guild.createRole({ name: "Leader", color: "#000000", permissions: [] })        
	             message.guild.createRole({ name: "Staff", color: "#000000", permissions: [] })
		     message.guild.createRole({ name: "Mod", color: "#000000", permissions: [] })					 
		     message.guild.createRole({ name: "~~~~~~~رتب مميزة~~~~~~~~", color: "#c73939", permissions: [] })					 
		     message.guild.createRole({ name: "Donitor", color: "#000000", permissions: [] })
		     message.guild.createRole({ name: "Golden", color: "#000000", permissions: [] })
		     message.guild.createRole({ name: "Silver", color: "#000000", permissions: [] })
		     message.guild.createRole({ name: "Diamond", color: "#000000", permissions: [] })
                     message.guild.createRole({ name: "Members", color: "#000000", permissions: [] })
					 
message.channel.sendMessage('**الرجاء الانتظار ريث ما يتم صناعه الرتب **')
}
});


client.on('guildMemberAdd', member => {
     const welcomer =  member.guild.channels.find('name', 'welcome');
    if(!welcomer) return;
      if(welcomer) {
         moment.locale('ar-ly');
         var m = member.user;
        let yumz = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(m.avatarURL)
        .setAuthor(m.username,m.avatarURL)
        .addField(': تاريخ دخولك الدسكورد',`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')} **\n** \`${moment(member.user.createdAt).fromNow()}\``,true)            
     
         .setFooter(`${m.tag}`,"https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif")
     welcomer.send({embed:yumz});          
         
   
 
 
 
const w = ['w.png'];
 
         let Image = Canvas.Image,
            canvas = new Canvas(800, 300),
            ctx = canvas.getContext('2d');
        fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 800, 300);
             
         
 
                let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(100) + ".png" : member.user.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);
                       
                       
                        ctx.font = '36px Arial';
                        ctx.fontSize = '72px';
                        ctx.fillStyle = "#ffffff";
                        ctx.textAlign = "center";
                        ctx.fillText(member.user.username, 545, 177);
 
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
                        ava.src = buf;
                        ctx.beginPath();
                        ctx.arc(169.5, 148, 126.9, -100, Math.PI * 2, true);
                        ctx.closePath();;
                        ctx.clip();
                        ctx.drawImage(ava, 36, 21, 260, 260); 
								 


                         
               
                             
welcomer.sendFile(canvas.toBuffer())



 
 
 
     
     
                    }  )  
     
                   
 
})
      });                    
 }
});



client.on('message' , message => {
    if(message.content === `<@${client.user.id}>`) {
        message.reply("مرحباً")
    }
});

var guilds = {};
client.on('guildBanAdd', function(guild) {
            const rebellog = client.channels.find("name", "log"),
            Onumber = 10,
  Otime = 10000
guild.fetchAuditLogs({
    type: 22
}).then(audit => {
    let banner = audit.entries.map(banner => banner.executor.id)
    let bans = guilds[guild.id + banner].bans || 0
    guilds[guild.id + banner] = {
        bans: 0
    }
      bans[guilds.id].bans += 3;
if(guilds[guild.id + banner].bans >= Onumber) {
try {
let roles = guild.members.get(banner).roles.array();
guild.members.get(banner).removeRoles(roles);

} catch (error) {
console.log(error)
try {
guild.members.get(banner).removeRoles(roles);
  rebellog.send(`<@!${banner.id}>
حآول العبث بالسيرفر @everyone`);
guild.owner.send(`<@!${banner.id}>
حآول العبث بالسيرفر ${guild.name}`)
    setTimeout(() => {
 guilds[guild.id].bans = 0;
  },Otime)
} catch (error) {
console.log(error)
}
}
}
})
});
 let channelc = {};
  client.on('channelCreate', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 10,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelcreate = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was Created By ${channelcreate.tag}`);
   if(!channelc[channelcreate.id]) {
    channelc[channelcreate.id] = {
    created : 0
     }
 }
 channelc[channelcreate.id].created += 3;
 if(channelc[channelcreate.id].created >= Onumber ) {
let roles = guild.members.get(banner).roles.array();
guild.members.get(banner).removeRoles(roles);
rebellog.send(`<@!${channelcreate.id}>
حآول العبث بالسيرفر @everyone`);
channel.guild.owner.send(`<@!${channelcreate.id}>
حآول العبث بالسيرفر ${channel.guild.name}`)
}
  setTimeout(() => {
 channelc[channelcreate.id].created = 0;
  },Otime)
  });

let channelr = {};
  client.on('channelDelete', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 10,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelremover = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was deleted By ${channelremover.tag}`);
   if(!channelr[channelremover.id]) {
    channelr[channelremover.id] = {
    deleted : 0
     }
 }
 channelr[channelremover.id].deleted += 3;
 if(channelr[channelremover.id].deleted >= Onumber ) {
let roles = guild.members.get(banner).roles.array();
guild.members.get(banner).removeRoles(roles);
rebellog.send(`<@!${channelremover.id}>
حآول العبث بالسيرفر @everyone`);
channel.guild.owner.send(`<@!${channelremover.id}>
حآول العبث بالسيرفر ${channel.guild.name}`)
}
  setTimeout(() => {
 channelr[channelremover.id].deleted = 0;
  },Otime)
  });








client.login(process.env.BOT_TOKEN);
