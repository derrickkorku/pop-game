window.onload = function (){
    // Initialize game state
    let currentGroup = getGeneratorRangeValues();
    let copyCurrentGroup;

    let score = 0;
    let timer;

    function startGame() {
        updateDisplay();
        timer = setInterval(nextGroup, 60000); // 1 minute
    }

    function updateDisplay() {
        let ul = document.getElementById('numbers-display')
        ul.innerHTML = ""

        handleCurrentGroupCopy()

        generateGroupItemsList(ul)

        document.getElementById('score').textContent = score;
    }

    function generateGroupItemsList(ul){
        for(let num of currentGroup){
            let li = document.createElement('li')
            li.innerText = num
            li.addEventListener("click", handlePop)
            ul.appendChild(li)
        }
    }

    function handleCurrentGroupCopy(){
        copyCurrentGroup = currentGroup.slice(0).sort()

        if (!isNaN(copyCurrentGroup[0])){
            copyCurrentGroup = copyCurrentGroup.sort((a, b) => b - a)
        } else {
            copyCurrentGroup = copyCurrentGroup.sort().reverse()
        }

        console.log(copyCurrentGroup)
    }

    function handlePop(event){
        let val = event.target.innerHTML
        if (!isNaN(val)){
            val = Number.parseInt(val)
        }

        //When generated group has only 1 item left
        if (isLastGroupItems()){
            return;
        }

        //When lowest value is pop
        if (val === copyCurrentGroup[copyCurrentGroup.length - 1]){
            score += 5
            copyCurrentGroup.pop() //Remove lowest item from copyCurrentGroup
        }  else {
            nextGroup()
        }

        //Remove lowest item from currentGroup
        const index = currentGroup.indexOf(val)
        currentGroup.splice(index, 1)

        updateDisplay()
    }

    function isLastGroupItems(){
        if (currentGroup.length === 1){
            score += 8;
            nextGroup();

            return true
        }

        return false;
    }


    function nextGroup() {
        currentGroup = getGeneratorRangeValues()
        updateDisplay();
    }

    /**
     * Randomly get a generator group and return a range values for the chosen generator
     * This pattern relies on the plugin architecture pattern
     */
    function getGeneratorRangeValues(){
        const generators = [IntegerGroupGenerator, AlphabetGroupGenerator];
        const selectedGenerator = new generators[Math.floor(Math.random() * generators.length)]();
        return selectedGenerator.generateGroup();
    }

    startGame();
}