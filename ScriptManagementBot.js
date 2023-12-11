const prefix = '>';
let BatterySaving = false;

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if (sender == 'your katack name') { //본인 카톡이름 변경 필수 / You must change your Kakao Talk name

        if(msg == prefix + 'help'){ // 명령어목록과 사용법을 알려줍니다. / Provides a list of commands and instructions.
            replier.reply(help());
        }

        if(msg.startsWith(prefix + 'on ')){ // 해당 스크립트를 켭니다. / Turn on the appropriate script.
            let scriptName = msg.substr(4);
            let isOn = Api.on(scriptName);
            
            replier.reply(scriptName + ' on : ' + isOn);
        }

        if (msg.startsWith(prefix + 'off ')) { // 해당 스크립트를 끕니다. / Turn off the appropriate script.
            let scriptName = msg.substr(5);
            let isOff = Api.off(scriptName);

            replier.reply(scriptName + ' off : ' + isOff );
        }

        if (msg == prefix + 'on') { // 모든 스크립트를 켭니다. Turn on all scripts.
            replier.reply('All Bots On');
            Api.on();
        }

        if (msg == prefix + 'off') { // 모든 스크립트를 끕니다. Turn off all scripts.
            replier.reply('All Bots Off');
            Api.off();
        }

        if(msg.startsWith(prefix + 'toast ')){ // 자신의 스마트폰에 토스트 메세지를 띄웁니다. / Put a toast message on your smartphone.
            let toastText = msg.substr(7);
            Api.showToast(toastText);
        }

        if(msg == prefix + 'compile'){ // 모든 스크립트를 컴파일 합니다. / Compiles all scripts.
            Api.compile();
            replier.reply('all script compile completed');
        }

        if(msg.startsWith(prefix + 'compile ')){ // 해당 스크립트를 컴파일 합니다. / Compiles the script.
            let compile = Api.compile(msg.substr(9));
            replier.reply(msg.substr(9) + ' compiled : ' + compile);
        }

        if(msg == prefix + 'Battery'){ // 현재 자신의 스마트폰의 배터리 잔량을 표시합니다. / Displays the remaining battery capacity of your current smartphone.
            let BatteryLevel = Device.getBatteryLevel()
            replier.reply(BatteryLevel + "%");
        }

        if(msg == prefix + 'BatterySaving'){ // 자신의 스마트폰이 15% 이하가 될 시 자동으로 모든 스크립트를 끕니다. BatterySaving의 값은 boolean이며, 기본적으로 false 상태입니다. / Turn off all scripts automatically when your smartphone is 15% or less. BatterySaving has a value of boolean, which is false by default.
            BatterySaving = !BatterySaving;
            replier.reply('BatterySaving : ' + BatterySaving);
        }

        if(BatterySaving){ // 위 BatterySaving 명령를 실행하는 코드입니다. 모든 스크립트가 꺼지기 전에 자신의 개인 카톡에 알림이오며 토스트메세지 또한 같이 띄웁니다. / Code that executes the above Battery Saving command. Before all scripts are turned off, you will be notified on your personal Kakaotalk and you will also see a toast message.
            if(Device.getBatteryLevel() <= 15){
                if(room == 'your katack name'){
                    replier.reply('남은 배터리 잔량이 15% 이하 이므로 모든 봇을 off 합니다.\n(관리자봇 포함)');
                    Api.showToast('남은 배터리 잔량이 15% 이하 이므로 모든 봇을 off 합니다.\n(관리자봇 포함)');
                    Api.off();
                }
            }
        }
    }
}

function help(){
    let msg = '관리자 명령어​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​\n\n';
    const help = [
        'on',
        'on (scriptName)',
        'off',
        'off (scriptName)',
        'compile',
        'compile (scriptName)',
        'toast (text)',
        'Battery',
        'BatterySaving',
        '',
        '접두사 : >'
    ];

    msg += help.join('\n');

    return msg;
}
