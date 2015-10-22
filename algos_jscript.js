var numbers_to_sort = Array();
function input_validate(current_number)  
   {  
      var numbers = /^[-+]?[0-9]+$/;  
      if(current_number.match(numbers)  && -1000<current_number && current_number<1000)  
      {  
		accepted_input(current_number);
		
      }  
      else  
      {  
		alert('Wrong format');  
		
      } 
		return false;
   }  

 function accepted_input( cur ){
	numbers_to_sort.push(cur);
	var newelement = document.createElement('div');
	newelement.className +='boxes';
	newelement.innerHTML += ""+cur;
	newelement.style.left = '0px';
	newelement.style.top = '100px';
	newelement.style.borderWidths = '1px';
	document.getElementById("animation").appendChild(newelement);
	console.log(numbers_to_sort);
}

function move_vertically( E, steps , delta, myposition_in_animation_array){         // delta = 1 for moving down and -1 for moving up
	//alert("vertical : "+ steps);
	var top = parseInt(E.style.top);
	var no_of_steps = 0;
	E.className = 'static';
	function actual_move( ){
		//alert(x);
		top+=delta;
		no_of_steps ++;
		E.style.top = top + 'px';
		if( no_of_steps == steps ){
		  clearInterval (id);
		  start_animation(-myposition_in_animation_array);
		}
	}
	var id = setInterval(actual_move,10);
}

function move_horizontally( E, steps , delta, myposition_in_animation_array){         // delta = 1 for moving right and -1 for moving left
	//alert(steps);
	var left = parseInt(E.style.left);
	var no_of_steps = 0;
	E.className = 'static';
	function actual_move( ){
		//alert(x);
		left+=delta;
		no_of_steps ++;
		E.style.left = left + 'px';
		if( no_of_steps == steps ){
		  clearInterval (id);
		  start_animation(-myposition_in_animation_array);
		}
	}
	var id = setInterval(actual_move,10);
}

function move_verticallyDup(E, steps, delta, myposition_in_animation_array) {         // delta = 1 for moving down and -1 for moving up
    //alert("vertical : "+ steps);
    var top = parseInt(E.style.top);
    var no_of_steps = 0;
    E.className = 'static';
    function actual_move() {
        //alert(x);
        top += delta;
        no_of_steps++;
        E.style.top = top + 'px';
        if (no_of_steps == steps) {
            clearInterval(id);
            start_animationDup(-myposition_in_animation_array);
        }
    }
    var id = setInterval(actual_move, 10);
}

function move_horizontallyDup(E, steps, delta, myposition_in_animation_array) {         // delta = 1 for moving right and -1 for moving left
    //alert(steps);
    var left = parseInt(E.style.left);
    var no_of_steps = 0;
    E.className = 'static';
    function actual_move() {
        //alert(x);
        left += delta;
        no_of_steps++;
        E.style.left = left + 'px';
        if (no_of_steps == steps) {
            clearInterval(id);
            start_animationDup(-myposition_in_animation_array);
        }
    }
    var id = setInterval(actual_move, 10);
}

var animation_array = Array(1);
var quickKey = 0;
function start_animation (pos){
        
	if( pos < 0 ) pos = -pos+1;
	if( pos < animation_array.length){ 
	    var cur = animation_array[pos];
	    console.log('animation array position:' + pos);
        console.log('moving element:'+cur.element.innerHTML);
        cur.func(cur.element, cur.steps, cur.delta, pos);
        cur.element.className = 'middle';
       
	}
	if (pos >= animation_array.length && quickKey === 1) sortingDup();
}

var animation_array1 = Array(1);
function start_animationDup(pos) {

    if (pos < 0) pos = -pos + 1;
    if (pos < animation_array1.length) {
        var cur = animation_array1[pos];
        console.log('animation arrayDup position:' + pos);
        console.log('moving element:' + cur.element.innerHTML);
        cur.func(cur.element, cur.steps, cur.delta, pos);
        cur.element.className = 'middle';
    }
}

 function insertionSort(){
     var nodelist = document.getElementById('animation').childNodes;
     var copy_nodelist = Array(1);
     for (var i = 1; i < nodelist.length; i++) copy_nodelist.push(nodelist[i]);
     
     sorting(copy_nodelist, 1, copy_nodelist.length);
 }
 function sorting(copy_nodelist, low, high) {
	//var nodelist = document.getElementById('animation').childNodes;
	//var copy_nodelist = Array(1);
	//for( var i = 1; i < nodelist.length; i++) copy_nodelist.push( nodelist[i]);
	
	var stepsize = 42; //TODO: nodelist[1].style.width + 2*nodelist[1].style.border;
	for( var i = low; i <high; i++){
		var right_element = copy_nodelist[i];
		animation_array.push({ func:move_vertically,element:right_element, steps:42, delta:-1} );
		for( var j = i-1; j >0; j--){
			if( parseInt(copy_nodelist[j].innerHTML) > parseInt(right_element.innerHTML) ) {
				var current_animation = { func:move_horizontally,element:copy_nodelist[j], steps:42, delta:+1} ; 
				animation_array.push(current_animation); 
				current_animation = { func:move_horizontally,element:right_element, steps:42, delta:-1} ; 
				animation_array.push(current_animation);
				
				copy_nodelist[j+1] = copy_nodelist[j];
                                console.log(copy_nodelist[j+1]);
				copy_nodelist[j] = right_element;
				console.log(copy_nodelist[j]);	
			}else {
				
				break;
			}
		}
		animation_array.push({ func:move_vertically,element:right_element, steps:42, delta:1} );
                console.log(copy_nodelist);
	}
	start_animation(1);
 }
 
 function mergeSort(){
      var inter_node=null,inter_fnode=null;
     var nodelist1 = document.getElementById('animation').childNodes;
	var copy_nodelist1 = Array(1);
	for( var i = 1; i < nodelist1.length; i++) copy_nodelist1.push( nodelist1[i]);
	
	var stepsize = 42; //TODO: nodelist[1].style.width + 2*nodelist[1].style.border;
	
        for( var i = 2; i < nodelist1.length; i+=2){
		var right_element = copy_nodelist1[i];
		animation_array.push({ func:move_vertically,element:right_element, steps:42, delta:-1} );
		animation_array.push({ func:move_vertically,element:copy_nodelist1[i-1], steps:42, delta:-1} );
			if( parseInt(copy_nodelist1[i-1].innerHTML) > parseInt(right_element.innerHTML) ) {
				var current_animation = { func:move_horizontally,element:copy_nodelist1[i-1], steps:42, delta:+1} ; 
				animation_array.push(current_animation); 
				current_animation = { func:move_horizontally,element:right_element, steps:42, delta:-1} ; 
				animation_array.push(current_animation);
				
				copy_nodelist1[i] = copy_nodelist1[i-1];
				copy_nodelist1[i-1] = right_element;
					
			}
	        
		animation_array.push({ func:move_vertically,element:right_element, steps:42, delta:1} );
                animation_array.push({ func:move_vertically,element:copy_nodelist1[i], steps:42, delta:1} );
                
          if(i%4===0){
           
            for( var i1 = i-3; i1 <=i; i1++){
                var merge_iright = copy_nodelist1[i1];
		animation_array.push({ func:move_vertically,element:merge_iright, steps:42, delta:-1} );
		for( var j1 = i1-1; j1 >=i-3; j1--){
                      inter_node=copy_nodelist1[j1];
                      animation_array.push({ func:move_vertically,element:copy_nodelist1[j1], steps:42, delta:-1} );
			if( parseInt(copy_nodelist1[j1].innerHTML) > parseInt(merge_iright.innerHTML) ) {
				var current_animation = { func:move_horizontally,element:copy_nodelist1[j1], steps:42, delta:+1} ; 
				animation_array.push(current_animation); 
				current_animation = { func:move_horizontally,element:merge_iright, steps:42, delta:-1} ; 
				animation_array.push(current_animation);
				
				copy_nodelist1[j1+1] = copy_nodelist1[j1];
				copy_nodelist1[j1] = merge_iright;
					
			}
			      animation_array.push({ func:move_vertically,element:inter_node, steps:42, delta:1} );
		}
                animation_array.push({ func:move_vertically,element:merge_iright, steps:42, delta:1} );
            }   
          }
        }
        for( var x = 1; x <nodelist1.length; x++){
                var merge_fright = copy_nodelist1[x];
		animation_array.push({ func:move_vertically,element:merge_fright, steps:42, delta:-1} );
		for( var y = x-1; y >0; y--){
                    console.log('x:'+x+' y:'+y);
                      inter_fnode=copy_nodelist1[y];
                      animation_array.push({ func:move_vertically,element:copy_nodelist1[y], steps:42, delta:-1} );
			if( parseInt(copy_nodelist1[y].innerHTML) > parseInt(merge_fright.innerHTML) ) {
				var current_animation = { func:move_horizontally,element:copy_nodelist1[y], steps:42, delta:+1} ; 
				animation_array.push(current_animation); 
				current_animation = { func:move_horizontally,element:merge_fright, steps:42, delta:-1} ; 
				animation_array.push(current_animation);
				
				copy_nodelist1[y+1] = copy_nodelist1[y];
				copy_nodelist1[y] = merge_fright;
					
			}
			      animation_array.push({ func:move_vertically,element:inter_fnode, steps:42, delta:1} );
                              console.log('after inner loop , copy_nodelist1[y]:'+ inter_fnode.innerHTML);
		}
                animation_array.push({ func:move_vertically,element:merge_fright, steps:42, delta:1} );
                console.log('after inner loop , merge_iright:'+merge_fright.innerHTML);
        }
        
        
        console.log('before calling start_animation');
	start_animation(1);
}

var pivot=0;
var pIndex = 1;
var quickNodeList = Array(1);
function quickSort(cpNodeList,lIndex,rIndex){
    //var orig_NodeList= document.getElementById('animation').childNodes;
    //var cpNodeList=Array(1);
    var current_animation;
    //for(var i=1; i<orig_NodeList.length; i++) cpNodeList.push(orig_NodeList[i]);
    //for(var i=0; i<orig_NodeList.length; i++) console.log(cpNodeList[i].innerHTML);
    
    //var lIndex=2,rIndex=orig_NodeList.length-1;
    pIndex=lIndex;
    pivot = cpNodeList[pIndex];
    lIndex++;
    animation_array.push({ func:move_vertically,element:pivot, steps:42, delta:-1} );
    while (lIndex < rIndex) {//changed condition to equal
        //for(var i=lIndex; i<rIndex; i++ ){
        console.log('inside while loop-begin');
        console.log('lIndex:' + lIndex + '  rIndex:' + rIndex);
        while (parseInt(pivot.innerHTML) >= parseInt(cpNodeList[lIndex].innerHTML)) {
            //changed to lIndex<=(rIndex) from lIndex<=(cpNodeList.length-1)
            console.log('inside while innnerloop1-begin');
            current_animation = { func: move_vertically, element: cpNodeList[lIndex], steps: 42, delta: -1 };
            animation_array.push(current_animation);

            current_animation = { func: move_vertically, element: cpNodeList[lIndex], steps: 42, delta: 1 };
            animation_array.push(current_animation);
            lIndex++;
            if (lIndex >= cpNodeList.length) {
                lIndex--;
                break;
            }
            console.log('lIndex:' + lIndex + '  rIndex:' + rIndex);
        }
        if ((lIndex < rIndex) && (parseInt(pivot.innerHTML) < parseInt(cpNodeList[lIndex].innerHTML))) {
            //added extra condition on left and right indices
            console.log(cpNodeList[lIndex].innerHTML);
            current_animation = { func: move_vertically, element: cpNodeList[lIndex], steps: 42, delta: -1 };
            animation_array.push(current_animation);
        }
        //for(var j=rIndex; j>=lIndex;j--) {
        while (parseInt(pivot.innerHTML) < parseInt(cpNodeList[rIndex].innerHTML)) {
            //changed condition to rIndex>=lIndex  from rIndex>=pIndex 
            current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: -1 };
            animation_array.push(current_animation);
            current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: 1 };
            animation_array.push(current_animation);
            rIndex--;
            if (rIndex < lIndex) {

                break;
            }
            console.log('lIndex:' + lIndex + '  rIndex:' + rIndex);
        }
        if ((rIndex > lIndex) && (parseInt(pivot.innerHTML) > parseInt(cpNodeList[rIndex].innerHTML))) {
            //added extra condition (rIndex!==lIndex)
            current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: -1 };
            animation_array.push(current_animation);
        }
        //}
        console.log('before final step:' + lIndex + rIndex);
        if (lIndex < rIndex) { //changed equal condition
            console.log('difference between left and right indices:' + (rIndex - lIndex));
            console.log('lIndex:' + lIndex + '  rIndex:' + rIndex);
            current_animation = { func: move_horizontally, element: cpNodeList[lIndex], steps: 42 * (rIndex - lIndex), delta: +1 };
            animation_array.push(current_animation);
            current_animation = { func: move_horizontally, element: cpNodeList[rIndex], steps: 42 * (rIndex - lIndex), delta: -1 };
            animation_array.push(current_animation);

            current_animation = { func: move_vertically, element: cpNodeList[lIndex], steps: 42, delta: 1 };
            animation_array.push(current_animation);
            current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: 1 };
            animation_array.push(current_animation);

            var temp = cpNodeList[rIndex];
            cpNodeList[rIndex] = cpNodeList[lIndex];
            cpNodeList[lIndex] = temp;

            console.log('before incrementing the lIndex value:' + lIndex);
            lIndex++;
            console.log('before decrementing the rIndex value:' + rIndex);
            rIndex--;
        }

    }
    if (lIndex > rIndex) {
        console.log('inside strict if condition');
        console.log('difference between left and pivot indices:' + (rIndex - pIndex));
        console.log('lIndex:' + lIndex + '  rIndex:' + rIndex);
        current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: -1 };
        animation_array.push(current_animation);

        animation_array.push({ func: move_horizontally, element: pivot, steps: 42 * (rIndex - pIndex), delta: 1 });
        current_animation = { func: move_horizontally, element: cpNodeList[rIndex], steps: 42 * (rIndex - pIndex), delta: -1 };
        animation_array.push(current_animation);

        animation_array.push({ func: move_vertically, element: pivot, steps: 42, delta: 1 });
        current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: 1 };
        animation_array.push(current_animation);

        var temp = cpNodeList[rIndex];
        cpNodeList[rIndex] = pivot;
        cpNodeList[pIndex] = temp;
        rIndex--;

    }

    if (lIndex === rIndex) {
        console.log('inside equal if condition');
        console.log('difference between left and pivot indices:' + (rIndex - pIndex));
        console.log('lIndex:' + lIndex + '  rIndex:' + rIndex);
        current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: -1 };
        animation_array.push(current_animation);

        animation_array.push({ func: move_horizontally, element: pivot, steps: 42 * (rIndex - pIndex), delta: 1 });
        current_animation = { func: move_horizontally, element: cpNodeList[rIndex], steps: 42 * (rIndex - pIndex), delta: -1 };
        animation_array.push(current_animation);

        animation_array.push({ func: move_vertically, element: pivot, steps: 42, delta: 1 });
        current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: 1 };
        animation_array.push(current_animation);

        var temp = cpNodeList[rIndex];
        cpNodeList[rIndex] = pivot;
        cpNodeList[pIndex] = temp;
        rIndex--;
        console.log('before exiting the quicksort lIndex and rIndex::' + lIndex + '::' + rIndex);
    }
       start_animation(1);
       pIndex = rIndex;
       console.log('before returnig pivot: rIndex::' + pIndex);
       return pIndex;
   
}

function quick() {
    console.log('in quick-------------------------');
    console.log('before quicksort call : pIndex:' + pIndex);
    var orig_NodeList= document.getElementById('animation').childNodes;
    var cpNodeList=Array(1);
    
    for(var i=1; i<orig_NodeList.length; i++) cpNodeList.push(orig_NodeList[i]);
    
    QSort(cpNodeList, 2, (cpNodeList.length-1));
    console.log('after quicksort call : pIndex:'+pIndex);
}

function QSort(cpNodeList,lIndex,rIndex){
   console.log('in qsort-------------------------');
   if(lIndex<rIndex) {
      
       
    pIndex=quickSort(cpNodeList,lIndex,rIndex);
    console.log('in QSort before left array sort');
    QSort(cpNodeList,lIndex,(pIndex-1));
    QSort(cpNodeList,pIndex,rIndex);
   
    }
    
}

function quickSort_work() {
    var orig_NodeList = document.getElementById('animation').childNodes;
    var cpNodeList = Array(1);
    var cpNodeList1 = Array(1);
    var current_animation;
    for (var i = 1; i < orig_NodeList.length; i++) cpNodeList.push(orig_NodeList[i]);
    //for(var i=0; i<orig_NodeList.length; i++) console.log(cpNodeList[i].innerHTML);

    var lIndex = 2, rIndex = orig_NodeList.length - 1;
    var pIndex = 1;
    pivot = cpNodeList[1];
    animation_array.push({ func: move_vertically, element: pivot, steps: 42, delta: -1 });
    pivot.className = 'middle';
    while (lIndex < rIndex) {//changed condition to equal
        //for(var i=lIndex; i<rIndex; i++ ){
        while (parseInt(pivot.innerHTML) > parseInt(cpNodeList[lIndex].innerHTML)) {
            //changed to lIndex<=(rIndex) from lIndex<=(cpNodeList.length-1)
            cpNodeList[lIndex].className = 'middle';
            current_animation = { func: move_vertically, element: cpNodeList[lIndex], steps: 42, delta: -1 };
            animation_array.push(current_animation);

            current_animation = { func: move_vertically, element: cpNodeList[lIndex], steps: 42, delta: 1 };
            animation_array.push(current_animation);
            lIndex++;
            if (lIndex >= cpNodeList.length) {
                lIndex--;
                break;
            }
        }
        if ((lIndex < rIndex) && (parseInt(pivot.innerHTML) < parseInt(cpNodeList[lIndex].innerHTML))) {
            //added extra condition on left and right indices
            console.log(cpNodeList[lIndex].innerHTML);
            current_animation = { func: move_vertically, element: cpNodeList[lIndex], steps: 42, delta: -1 };
            animation_array.push(current_animation);
        }
        //for(var j=rIndex; j>=lIndex;j--) {
        while (parseInt(pivot.innerHTML) < parseInt(cpNodeList[rIndex].innerHTML)) {
            //changed condition to rIndex>=lIndex  from rIndex>=pIndex 
            cpNodeList[rIndex].className = 'middle';
            current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: -1 };
            animation_array.push(current_animation);
            current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: 1 };
            animation_array.push(current_animation);
            rIndex--;
            if (rIndex < lIndex) {

                break;
            }
        }
        if ((rIndex > lIndex) && (parseInt(pivot.innerHTML) > parseInt(cpNodeList[rIndex].innerHTML))) {
            //added extra condition (rIndex!==lIndex)
            current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: -1 };
            animation_array.push(current_animation);
        }
        //}
        console.log('before final step:' + lIndex + rIndex);
        if (lIndex < rIndex) { //changed equal condition
            console.log('difference between left and right indices:' + (rIndex - lIndex));
            current_animation = { func: move_horizontally, element: cpNodeList[lIndex], steps: 42 * (rIndex - lIndex), delta: +1 };
            animation_array.push(current_animation);
            current_animation = { func: move_horizontally, element: cpNodeList[rIndex], steps: 42 * (rIndex - lIndex), delta: -1 };
            animation_array.push(current_animation);

            current_animation = { func: move_vertically, element: cpNodeList[lIndex], steps: 42, delta: 1 };
            animation_array.push(current_animation);
            current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: 1 };
            animation_array.push(current_animation);

            var temp = cpNodeList[rIndex];
            cpNodeList[rIndex] = cpNodeList[lIndex];
            cpNodeList[lIndex] = temp;

            lIndex++;
            rIndex--;
        }

    }
    if (lIndex > rIndex) {
        console.log('inside strict if condition');
        console.log('difference between left and pivot indices:' + (rIndex - pIndex));
        console.log('lIndex:' + lIndex + '  rIndex:' + rIndex);
        current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: -1 };
        animation_array.push(current_animation);

        animation_array.push({ func: move_horizontally, element: pivot, steps: 42 * (rIndex - pIndex), delta: 1 });
        current_animation = { func: move_horizontally, element: cpNodeList[rIndex], steps: 42 * (rIndex - pIndex), delta: -1 };
        animation_array.push(current_animation);

        animation_array.push({ func: move_vertically, element: pivot, steps: 42, delta: 1 });
        current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: 1 };
        animation_array.push(current_animation);

        var temp = cpNodeList[rIndex];
        cpNodeList[rIndex] = pivot;
        cpNodeList[pIndex] = temp;

    }

    if (lIndex === rIndex) {
        console.log('inside equal if condition');
        console.log('difference between left and pivot indices:' + (rIndex - pIndex));
        console.log('lIndex:' + lIndex + '  rIndex:' + rIndex);
        current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: -1 };
        animation_array.push(current_animation);

        animation_array.push({ func: move_horizontally, element: pivot, steps: 42 * (rIndex - pIndex), delta: 1 });
        current_animation = { func: move_horizontally, element: cpNodeList[rIndex], steps: 42 * (rIndex - pIndex), delta: -1 };
        animation_array.push(current_animation);

        animation_array.push({ func: move_vertically, element: pivot, steps: 42, delta: 1 });
        current_animation = { func: move_vertically, element: cpNodeList[rIndex], steps: 42, delta: 1 };
        animation_array.push(current_animation);
        var temp = cpNodeList[rIndex];
        cpNodeList[rIndex] = pivot;
        cpNodeList[pIndex] = temp;
        rIndex--;
        console.log('before exiting the quicksort lIndex and rIndex::'+lIndex+'::'+rIndex);
    }
    //start_animation(1);

    /*while(animation_array.length>0){
        animation_array.shift();
    }
    animation_array[0] = {};
    console.log('animation array length before sorting:' + animation_array.length);
    orig_NodeList = document.getElementById('animation').childNodes;

    for (var i = 1; i < orig_NodeList.length; i++) cpNodeList1.push(orig_NodeList[i]);
    for (var i = 1; i < cpNodeList1.length; i++) {
        console.log('in sorting left array rIndex:' + rIndex + '::' + parseInt(cpNodeList1[rIndex].innerHTML));
        var right_element = cpNodeList1[i];
        animation_array1.push({ func: move_verticallyDup, element: right_element, steps: 42, delta: -1 });
        for (var j = i - 1; j > 0; j--) {
            if (parseInt(cpNodeList1[j].innerHTML) > parseInt(right_element.innerHTML)) {
                var current_animation = { func: move_horizontallyDup, element: cpNodeList1[j], steps: 42, delta: +1 };
                animation_array1.push(current_animation);
                current_animation = { func: move_horizontallyDup, element: right_element, steps: 42, delta: -1 };
                animation_array1.push(current_animation);
                console.log('swapping elements ' + parseInt(cpNodeList1[j + 1].innerHTML) + 'and' + parseInt(cpNodeList1[j].innerHTML));
                cpNodeList1[j + 1] = cpNodeList1[j];
                cpNodeList1[j] = right_element;
            } else {

                break;
            }
        }
        animation_array1.push({ func: move_verticallyDup, element: right_element, steps: 42, delta: 1 });
        console.log(cpNodeList1);
    }
   */

    for (var i = 1; i < cpNodeList.length; i++) {
        quickNodeList.push(cpNodeList[i]);
        console.log('at the end of quick sort ..element at ' + i + ' is' + parseInt(cpNodeList[i].innerHTML));
    }
    quickKey = 1;
    console.log('animation array length after sorting:' + animation_array.length);
    start_animation(1);
    console.log('after first animation');
    //start_animationDup(1);
    console.log('after second animation');
}

function sortingDup() {
    //var nodelist = document.getElementById('animation').childNodes;
    var copy_nodelist = Array(1);
    for (var i = 1; i < quickNodeList.length; i++) {
        copy_nodelist.push(quickNodeList[i]);
        console.log('in sortingDup element at' + i + ' is:' + parseInt(quickNodeList[i].innerHTML));
     }
    var stepsize = 42; //TODO: nodelist[1].style.width + 2*nodelist[1].style.border;
    for (var i = 1; i < copy_nodelist.length; i++) {
        var right_element = copy_nodelist[i];
        animation_array1.push({ func: move_verticallyDup, element: right_element, steps: 42, delta: -1 });
        right_element.className = 'static';
        for (var j = i - 1; j > 0; j--) {
            if (parseInt(copy_nodelist[j].innerHTML) > parseInt(right_element.innerHTML)) {
                copy_nodelist[j].className = 'static';
                var current_animation = { func: move_horizontallyDup, element: copy_nodelist[j], steps: 42, delta: +1 };
                animation_array1.push(current_animation);
                current_animation = { func: move_horizontallyDup, element: right_element, steps: 42, delta: -1 };
                animation_array1.push(current_animation);

                copy_nodelist[j + 1] = copy_nodelist[j];
                console.log(copy_nodelist[j + 1]);
                copy_nodelist[j] = right_element;
                console.log(copy_nodelist[j]);
            } else {

                break;
            }
        }
        animation_array1.push({ func: move_verticallyDup, element: right_element, steps: 42, delta: 1 });
        console.log(copy_nodelist);
    }
    start_animationDup(1);
}
function heapSort() {
    //construction of heap tree and then sorting multiple times can be visualized as insertion sort at the bottom level taking
    //first element as root. Move the root to next highest element down the array as we proceed. so heap sort can be approximately 
    //visualized as considering each unsorted element as root and place it in correct position.
    insertionSort()
}
