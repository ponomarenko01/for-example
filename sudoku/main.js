
function showTable(globalArr,i) {
    var newTable = document.createElement("table");
    var row, cell, i, j;
    for (var i=0; i<9; i++) {
        row = document.createElement('tr');
        for (var j=0; j<9; j++) {
            cell = document.createElement("td");
            cell.appendChild(document.createTextNode(globalArr[i*9+j]));
            cell.style.width = "50";
            cell.style.height = "50";
            cell.id = "tdn"+(10*i+j) ;
            row.appendChild(cell);
        }
        newTable.appendChild(row);
    }
    document.body.appendChild(newTable);
}


var globalArr = createArr(81);
	 
	function createArr(n){
		var arr=[];
			for(i=0;i<n;i++){
			arr.push(0)
			}
		return arr
	}

	decision(globalArr);
	 

	function toFindRow(number,row,globalArr) {
		for (var i=0; i<9; i++) {
			if (globalArr[row*9+i] == number) {
				return false;
			}
		}
		return true;
	}
	 
	function toFindCol(number,col,globalArr) {
		for (var i=0; i<9; i++) {
			if (globalArr[col+9*i] == number) {
				return false;
			}
		}
		return true;
	}
	 
	function toFindBlock(number,block,globalArr) {
		for (var i=0; i<9; i++) {
			if (globalArr[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)] == number) {
				return false;
			}
		}
		return true;
	}
	 
	function toFindNumber(cell,number,globalArr) {
		var row = Math.floor(cell / 9);
		var col =  cell % 9;
		var block =Math.floor((Math.floor(cell / 9)) / 3) * 3 + Math.floor((cell % 9) / 3);
		return toFindRow(number,row,globalArr) && toFindCol(number,col,globalArr) && toFindBlock(number,block,globalArr);
	}
	 
	function toTestRow(row,globalArr) {
		var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
		var rowTemp= new Array();
		for (var i=0; i<9; i++) {
			rowTemp[i] = globalArr[row*9+i];
		}
		rowTemp.sort();
		return rowTemp.join() == rightSequence.join();
	}
	 
	function toTestCol(col,globalArr) {
		var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
		var colTemp= new Array();
		for (var i=0; i<9; i++) {
			colTemp[i] = globalArr[col+i*9];
		}
		colTemp.sort();
		return colTemp.join() == rightSequence.join();
	}
	 
	function toTestBlock(block,globalArr) {
		var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
		var blockTemp= new Array();
		for (var i=0; i<9; i++) {
			blockTemp[i] = globalArr[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)];
		}
		blockTemp.sort();
		return blockTemp.join() == rightSequence.join();
	}
	 
	function toTestAllArr(globalArr) {
		for (var i=0; i<9; i++) {
			if (!toTestBlock(i,globalArr) || !toTestRow(i,globalArr) || !toTestCol(i,globalArr)) {
				return false;
			}
		}
		return true;
	}
	 
	function toSetTempValues(cell,globalArr) {
		var temp = new Array();
		for (var i=1; i<10; i++) {
			if (toFindNumber(cell,i,globalArr)) {
				temp.unshift(i);
			}
		}
		return temp;
	}
	  
	function toSetRandomTempValue(temp,cell) {
		var randomPicked = Math.floor(Math.random() * temp[cell].length);
		return temp[cell][randomPicked];
	}
	 
	function toTestArrForOriginal(globalArr) {
		var temp = new Array();
		for (var i=0; i<81; i++) {
			if (globalArr[i] == 0) {
				temp[i] = new Array();
				temp[i] = toSetTempValues(i,globalArr);
				if (temp[i].length==0) {
					return false;
				}
			}
		}
		return temp;
	}
	 
	function removeAttempt(attemptArray,number) {
		var newArray = new Array();
		for (var i=0; i<attemptArray.length; i++) {
			if (attemptArray[i] != number) {
				newArray.unshift(attemptArray[i]);
			}
		}
		return newArray;
	}
	
	function nextRandom(temp) {
		var max = 9;
		var min = 0;
		for (var i=0; i<81; i++) {
			if (temp[i]!=undefined) {
				if ((temp[i].length<=max) && (temp[i].length>0)) {
					max = temp[i].length;
					min = i;
				}
			}
		}
		return min;
	}
	

	function decision(globalArr) {
		var saved = new Array();
		var resultArr = new Array();
		var i=0;
		var nextMove;
		var whatToTry;
		var attempt;
		while (!toTestAllArr(globalArr)) {
			i++;
			nextMove = toTestArrForOriginal(globalArr);
			if (nextMove == false) {
				nextMove = saved.pop();
				globalArr = resultArr.pop();
			}
			whatToTry = nextRandom(nextMove);
			attempt = toSetRandomTempValue(nextMove,whatToTry);
			if (nextMove[whatToTry].length>1) {
				nextMove[whatToTry] = removeAttempt(nextMove[whatToTry],attempt);
				saved.push(nextMove.slice());
				resultArr.push(globalArr.slice());
			}
			globalArr[whatToTry] = attempt;
		}
		showTable(globalArr,i);
	}
	  

	