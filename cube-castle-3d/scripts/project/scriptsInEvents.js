


const scriptsInEvents = {

	async EventSheet1_Event1_Act3(runtime, localVars)
	{
		function getRandomPosition(min, max, step) {
		   const result = []
		    for (let i = min; i < max; i += step) {
		        result.push(i);
		    }
		    const randomIndex = Math.floor(Math.random() * result.length);
		    return result[randomIndex]
		}
		
		for (var j=0;j<runtime.globalVars.EnemyCount;j++) {
		    runtime.objects.Enemy.createInstance(0, getRandomPosition(10, 570, 20), getRandomPosition(10, 370, 20), false);
		}
		
		runtime.objects.Food.createInstance(0, getRandomPosition(10, 570, 20), getRandomPosition(10, 370, 20), false);
	},

	async EventSheet1_Event16_Act1(runtime, localVars)
	{
		function getRandomPosition(min, max, step) {
		   const result = []
		    for (let i = min; i < max; i += step) {
		        result.push(i);
		    }
		    const randomIndex = Math.floor(Math.random() * result.length);
		    return result[randomIndex]
		}
		
		runtime.objects.Food.getAllInstances()[1].x = getRandomPosition(10, 570, 20)
		
		runtime.objects.Food.getAllInstances()[1].y = getRandomPosition(10, 370, 20)
	},

	async EventSheet1_Event17_Act3(runtime, localVars)
	{
		function getRandomPosition(min, max, step) {
		   const result = []
		    for (let i = min; i < max; i += step) {
		        result.push(i);
		    }
		    const randomIndex = Math.floor(Math.random() * result.length);
		    return result[randomIndex]
		}
		
		runtime.objects.Food.getAllInstances()[1].x = getRandomPosition(10, 570, 20)
		
		runtime.objects.Food.getAllInstances()[1].y = getRandomPosition(10, 370, 20)
	},

	async EventSheet1_Event18_Act1(runtime, localVars)
	{
		var playAgain = window.confirm("Game Over. Your score was: " + runtime.globalVars.ScoreNum + " points. Would you like to play again?");
		
		if (playAgain == true) {
		    runtime.goToLayout("Layout 1");
		} else if (playAgain == false) {
		    runtime.goToLayout("Title Screen");
		}
	},

	async EventSheet1_Event19_Act1(runtime, localVars)
	{
		function getRandomPosition(min, max, step) {
		   const result = []
		    for (let i = min; i < max; i += step) {
		        result.push(i);
		    }
		    const randomIndex = Math.floor(Math.random() * result.length);
		    return result[randomIndex]
		}
		
		var chosenMover = Math.floor(Math.random() * (50 - 1)) + 1;
		
		runtime.objects.Enemy.getAllInstances()[chosenMover].x = getRandomPosition(10, 570, 20);
		
		runtime.objects.Enemy.getAllInstances()[chosenMover].y = getRandomPosition(10, 370, 20);
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

