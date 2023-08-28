exports.sendSms = async (phoneNumber, message, next) => {
    console.log('sending sms');
	const intlPhone =  ((phoneNumber.startsWith('251')) || (phoneNumber.startsWith('251')) )?`${phoneNumber}`:phoneNumber.slice(-12);	
	const username = (phoneNumber.startsWith('251') || phoneNumber.startsWith('+251'))?`mamapays`:`mobifins`;
    const requestBod = {
        "message": message,
        "mobile": intlPhone
    }
	console.log(requestBod)
    try {
        const auth = Buffer.from(`${username}:KmTt5#D_`).toString('base64');
        const response = await fetch(
            'https://helloomarket.com/api/send_mp_sms.php', {
            method: 'POST',
            body: JSON.stringify(requestBod),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        }
        );

        const value = await response.json();
	    console.log(value)
        console.log({ message: value['output'], level: value['op_status'] == 'successful' ? 'info' : 'error' });
        
    } catch (e) {
        // next(e);
        return res.json({error:'Server Error' })
    }
}

exports.callAnEndPointToVps = async () => {
    try {
	console.log('Hello')

        const response = await fetch(
            'https://bctsdev.giize.com/etswitch-banks/banks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );

        // const value = await response.json();
	// console.log('inside method',response)
    if(response.status>=300){
    return false;        
    }
    return true;        
    } catch (e) {
	console.log('inside error',e)
    return false;        
        
        // next(e);
    }
}
