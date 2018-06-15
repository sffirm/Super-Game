import global from '../config.js';
import modalTask from '../gameModule/modalTask.js';

function templateTranslateEnglish(word){
	return `<div class="translateEnglish_task" id="translateEnglish">
		<div class="word_text">
			Переведите с английского на русский слово:
		</div>
		<div class="word_block">${word}</div>
		<div class="word_input">
			<input type="text" class="word_answer">
		</div>
	</div>`
};

export default {
	translateEnglish: function(data){
		let word = data.word;
		let answer = data.translate;
		global.fightElement.tqName.innerHTML = 'Перевести с английского.';
		global.fightElement.taskContainer.innerHTML = templateTranslateEnglish(word);
		function taskDecision() {
				let value;
				let result;
				let inputEnter;
				return new Promise((resolve, reject) => {
					if ( window.clickHandler ) {
						global.fightElement.taskAply.removeEventListener('click', window.clickHandler);
					}
					window.clickHandler = function() {
						if(!this.hasAttribute('data-stop')) {
							let value = document.querySelector('.translateEnglish_task .word_answer').value;
							let result;
							let inputEnter;
							if(value.length < 1){
								global.fightElement.reportQuest.setAttribute('class', 'report_quest empty');
								return false;
							}
							this.setAttribute('data-stop', 'stop');
							setTimeout(() => { this.removeAttribute('data-stop') }, 5000);
							inputEnter = handlerEnter(value);

							result = (inputEnter >= 0) ? true : false;
							if(result){
								global.fightElement.reportQuest.setAttribute('class', 'report_quest true');
								setTimeout(() => {
									global.fightElement.reportQuest.setAttribute('class', 'report_quest');
								}, 5000);
								setTimeout(() => {
									modalTask('hide');
									global.fightElement.taskContainer.innerHTML = '';
									global.fightElement.tqName.innerHTML = '';
								}, 1000);
								resolve(result);
							} else {
								global.fightElement.reportQuest.setAttribute('class', 'report_quest false');
								setTimeout(() => {
									global.fightElement.reportQuest.setAttribute('class', 'report_quest');
								}, 5000);
								setTimeout(()=>{
									modalTask('hide');
									global.fightElement.taskContainer.innerHTML = '';
									global.fightElement.tqName.innerHTML = '';
								},1000);
								resolve(result);
							}
						}
						function handlerEnter(info){
							return answer.indexOf(info.trim().toLowerCase());
						}
					};

					global.fightElement.taskAply.addEventListener('click', window.clickHandler);
			});

		}
		return taskDecision();
	}
}