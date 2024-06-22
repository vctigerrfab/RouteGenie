
const container = document.querySelector(".data-container");
let visit = [];
let start = 0;
let end = 1;
let counter = 0;
var n = 20;   //n=>number of rows
var m = 30;    //m=>number of columns
var tot = n * m;       //tot=>total cells
function generatecells() {
    for (let i = 0; i < tot; i += 1) {
        visit[i] = 0;
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {

            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.transform = `translate(${j * 30}px, ${i * (-30)}px)`;
            const cellLabel = document.createElement("label");
            cellLabel.classList.add("btn2");
            cellLabel.innerHTML = i * m + j;
            cellLabel.style.color = `rgb(300, 300, 300)`;
            cellLabel.addEventListener("click", function () {
                let cells = document.querySelectorAll(".cell");
                let k = cellLabel.innerHTML;
                if (counter == 0) {
                    start = Number(k);
                    cells[start].style.backgroundColor = `rgb(300, 300, 0)`;
                    cellLabel.style.color = `rgb(300, 300, 0)`;
                    counter++;
                }
                else if (counter == 1) {
                    end = Number(k);
                    cellLabel.style.color = `rgb(300, 300, 0)`;
                    cells[end].style.backgroundColor = ` rgb(300, 300, 0)`;
                    counter++;
                }
                else {
                    cellLabel.style.color = `rgb(46, 40, 38)`;
                    cells[k].style.backgroundColor = ` rgb(46, 40, 38)`;
                    visit[k] = -1;
                }
            })
            cell.appendChild(cellLabel);
            container.appendChild(cell);

        }
    }
}


async function astardiagonal(delay = 300) {
    let cells = document.querySelectorAll(".cell");
    let labels = document.querySelectorAll(".btn2");
    visit[start] = 1;
    let queue = [];
    let parent = new Array(tot + 5);
    let level = new Array(tot + 5);
    let cost = [];
    queue.push(start);
    parent[start] = -1;
    level[start] = 0;
    let x = Math.max(Math.abs(Math.floor(end / m) - Math.floor(start / m)) , Math.abs(Math.floor(end % m) - Math.floor(start % m)));
    cost.push(x);
    let flag = 0;
    while (queue.length) {
        flag = 0;
        let l = queue.length;
        l--;
        console.log(queue[l],cost[l], "popped");
        let last = queue[l];
        queue.pop();
        cost.pop();
        if (visit[last] == 2) continue;
        if (last == end) { flag = 1; break; }
        if (last != start && last != end) {
            labels[last].style.color = "rgb(0, 100, 200)";
            cells[last].style.backgroundColor = "rgb(0, 100, 200)";
        }
        visit[last] = 2;
        if ((last + 1) % m != 0 && visit[last + 1] != 2) {
            if (visit[last + 1] == 0) {
                queue.push(last + 1);
                parent[last + 1] = last;
                level[last + 1] = level[last] + 1;
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last + 1) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last + 1) % m)));
                cost.push(level[last + 1] + x);
                sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                if (last + 1 != end) {
                    cells[last + 1].style.backgroundColor = "rgb(50, 200, 200)";
                    labels[last + 1].style.color = "rgb(50, 200, 200)";
                }
                visit[last + 1] = 1;
            }
            else if (visit[last + 1] == 1) {
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last + 1) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last + 1) % m)));
                if (level[last + 1] > level[last] + 1) {
                    cost.push(level[last] + 1 + x);
                    queue.push(last + 1);
                    level[last + 1] = level[last] + 1;
                    sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                    parent[last + 1] = last;
                }
            }
        }
        if (last % m != 0 && visit[last - 1] != 2) {
            if (visit[last - 1] == 0) {
                queue.push(last - 1);
                parent[last - 1] = last;
                level[last - 1] = level[last] + 1;
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last - 1) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last - 1) % m)));
                cost.push(level[last - 1] + x);
                sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                if (last - 1 != end) {
                    cells[last - 1].style.backgroundColor = "rgb(50, 200, 200)";
                    labels[last - 1].style.color = "rgb(50, 200, 200)";
                }
                visit[last - 1] = 1;
            }
            else if (visit[last - 1] == 1) {
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last - 1) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last - 1) % m)));
                if (level[last - 1] > level[last] + 1) {
                    cost.push(level[last] + 1 + x);
                    queue.push(last - 1);
                    level[last - 1] = level[last] + 1;
                    sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                    parent[last - 1] = last;
                }
            }
        }
        if ((last + m) < tot && visit[last + m] != 2) {
            if (visit[last + m] == 0) {
                queue.push(last + m);
                parent[last + m] = last;
                level[last + m] = level[last] + 1;
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last + m) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last + m) % m)));
                cost.push(level[last + m] + x);
                sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                if (last + m != end) {
                    cells[last + m].style.backgroundColor = "rgb(50, 200, 200)";
                    labels[last + m].style.color = "rgb(50, 200, 200)";
                }
                visit[last + m] = 1;
            }
            else if (visit[last + m] == 1) {
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last + m) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last + m) % m)));
                if (level[last + m] > level[last] + 1) {
                    cost.push(level[last] + 1 + x);
                    queue.push(last + m);
                    level[last + m] = level[last] + 1;
                    sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                    parent[last + m] = last;
                }
            }
        }
        if ((last - m) >= 0 && visit[last - m] != 2) {
            if (visit[last - m] == 0) {
                queue.push(last - m);
                parent[last - m] = last;
                level[last - m] = level[last] + 1;
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last - m) / m)), Math.abs(Math.floor(end % m) - Math.floor((last - m) % m)));
                cost.push(level[last - m] + x);
                sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                if (last - m != end) {
                    cells[last - m].style.backgroundColor = "rgb(50, 200, 200)";
                    labels[last - m].style.color = "rgb(50, 200, 200)";
                }
                visit[last - m] = 1;
            }
            else if (visit[last - m] == 1) {
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last - m) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last - m) % m)));
                if (level[last - m] > level[last] + 1) {
                    cost.push(level[last] + 1 + x);
                    queue.push(last - m);
                    level[last - m] = level[last] + 1;
                    sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                    parent[last - m] = last;
                }
            }
        }
        if (last % m != 0 && last+m<tot&& visit[last +m- 1] != 2) {
            if (visit[last +m- 1] == 0) {
                queue.push(last +m- 1);
                parent[last +m- 1] = last;
                level[last +m- 1] = level[last] + 1;
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last + m-1) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last +m- 1) % m)));
                cost.push(level[last +m- 1] + x); console.log("hi",last, last+m-1 , queue[queue.length-1],cost[queue.length-1]);
                sort(); 
                if (last +m- 1 != end) {
                    cells[last +m- 1].style.backgroundColor = "rgb(50, 200, 200)";
                    labels[last +m- 1].style.color = "rgb(50, 200, 200)";
                }
                visit[last +m- 1] = 1;
            }
            else if (visit[last +m- 1] == 1) {
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last + m- 1) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last + m - 1) % m)));
                if (level[last + m-1] > level[last] + 1) {
                    cost.push(level[last] + 1 + x);
                    queue.push(last + m- 1);
                    level[last +m- 1] = level[last] + 1;
                    sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                    parent[last +m- 1] = last;
                }
            }
        }
        if ((last + 1) % m != 0 && last+m<tot&& visit[last +m+ 1] != 2) {
            if (visit[last +m+ 1] == 0) {
                queue.push(last +m + 1);
                parent[last +m + 1] = last;
                level[last +m + 1] = level[last] + 1;
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last + m + 1) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last +m + 1) % m)));
                cost.push(level[last +m + 1] + x);
                sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                if (last +m+ 1 != end) {
                    cells[last +m + 1].style.backgroundColor = "rgb(50, 200, 200)";
                    labels[last +m + 1].style.color = "rgb(50, 200, 200)";
                }
                visit[last +m + 1] = 1;
            }
            else if (visit[last +m + 1] == 1) {
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last +m + 1) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last + m + 1) % m)));
                if (level[last + m+1] > level[last] + 1) {
                    cost.push(level[last] + 1 + x);
                    queue.push(last +m+ 1);
                    level[last +m+ 1] = level[last] + 1;
                    sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                    parent[last +m+ 1] = last;
                }
            }
        }
        if (last % m != 0 && last-m>=0&& visit[last -m- 1] != 2) {
            if (visit[last -m- 1] == 0) {
                queue.push(last -m- 1);
                parent[last -m- 1] = last;
                level[last -m- 1] = level[last] + 1;
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last - m-1) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last -m- 1) % m)));
                cost.push(level[last -m- 1] + x);
                sort();  console.log(queue[queue.length-1],cost[queue.length-1]);
                if (last -m- 1 != end) {
                    cells[last -m- 1].style.backgroundColor = "rgb(50, 200, 200)";
                    labels[last-m- 1].style.color = "rgb(50, 200, 200)";
                }
                visit[last -m- 1] = 1;
            }
            else if (visit[last -m- 1] == 1) {
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last -m-1) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last -m- 1) % m)));
                if (level[last - m-1] > level[last] + 1) {
                    cost.push(level[last] + 1 + x);
                    queue.push(last -m- 1);
                    level[last -m- 1] = level[last] + 1;
                    sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                    parent[last -m- 1] = last;
                }
            }
        }
        if ((last + 1) % m != 0 && last-m>=0&& visit[last -m+ 1] != 2) {
            if (visit[last -m+ 1] == 0) {
                queue.push(last -m+ 1);
                parent[last -m+ 1] = last;
                level[last -m+ 1] = level[last] + 1;
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last - m+1) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last - m+ 1) % m)));
                cost.push(level[last -m+ 1] + x);
                sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                if (last -m+ 1 != end) {
                    cells[last -m+ 1].style.backgroundColor = "rgb(50, 200, 200)";
                    labels[last -m+ 1].style.color = "rgb(50, 200, 200)";
                }
                visit[last -m+ 1] = 1;
            }
            else if (visit[last -m+ 1] == 1) {
                x = Math.max(Math.abs(Math.floor(end / m) - Math.floor((last -m+ 1) / m)) , Math.abs(Math.floor(end % m) - Math.floor((last -m+ 1) % m)));
                if (level[last - m+1] > level[last] + 1) {
                    cost.push(level[last] + 1 + x);
                    queue.push(last - m + 1);
                    level[last -m+ 1] = level[last] + 1;
                    sort(); console.log(queue[queue.length-1],cost[queue.length-1]);
                    parent[last -m+ 1] = last;
                }
            }
        }
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 30)
        );
        if (flag == 1) break;
    }
    if (flag == 0) console.log("unreachable");
    else {
        child = [];
        j = end;
        while (j != start) {
            child.push(j);
            j = parent[j];
        }
        i = child.length - 1;
        while (i > 0) {
            cells[child[i]].style.backgroundColor = " rgb(200,170,0)";
            labels[child[i]].style.color = " rgb(200,170,0)";
            i--;

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 50)
            );
        }

    }

    function sort() {
        let l = queue.length;
        l--;
        let last = queue[l];
        let i = l - 1; let val = cost[l];
        while (i >= 0 && val >= cost[i]) {
            cost[i + 1] = cost[i];
            queue[i + 1] = queue[i];
            i--;
        }
        i++;
        queue[i] = last;
        cost[i] = val;
        console.log(last," last ",val," val ", parent[last]);
    }
}

document.getElementById("Button1").disabled = false;
document.getElementById("Button1").style.backgroundColor = "rgb(10,10,10)";

generatecells();

// function to disable the button
function disable() {
    document.getElementById("Button1").disabled = true;
    document.getElementById("Button1").style.backgroundColor = "rgb(40,40,40)";
}
