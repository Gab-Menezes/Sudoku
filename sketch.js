//38, 39, 41 -> Background
//163, 59, 56 -> Selected square
//170 -> Numbers
//100, 50, 100 -> Immutable numbers

let clicktimes = 0;

let space = 80;
let sq = [];

let countX = 0;
let countY = 0;
let backupX = -1, backupY = -1;

let check = false;

let Columns = []; //left to right -> Y
let Rows = []; //top to bottom -> X
let Cells = [];
//let Diagonals = [];

let button = [];
let win = false;

//initialization of columns, rows and cells
function ArraysInit()
{
    for (let i = 0; i < 9; i++)
    {
        //Diagonals[i] = i + 1;
        Columns[i] = [];
        Rows[i] = [];
        for (let j = 0; j < 9; j++)
        {  
            Columns[i][j] = j + 1;
            Rows[i][j] = j + 1;
        }
    }
    for (let i = 0; i < 3; i++)
    {
        Cells[i] = [];
        for (let j = 0; j < 3; j++) 
        {
            Cells[i][j] = [];
            for (let k = 0; k < 9; k++)
            {
                Cells[i][j][k] = k + 1;                
            }            
        }   
    }
}

//Checks if the current state is a win
function Victory()
{
    //left to right
    for (let k = 0; k < 9; k++)
    {     
        for (let i = 0; i < 9; i++) 
        {
            for (let j = 0; j < 9; j++)
            {
                if (i == 8)
                {
                    break;
                }
                if (i == j)
                {
                    j++;
                }
                if (sq[i][k].GetValue() == sq[j][k].GetValue())
                {
                    //console.log(i + "; " + k + " | " + j + "; " + k);
                    return false;
                }
            }
        }
    }

    //top to bottom
    for (let k = 0; k < 9; k++)
    {     
        for (let i = 0; i < 9; i++) 
        {
            for (let j = 0; j < 9; j++)
            {
                if (i == 8)
                {
                    break;
                }
                if (i == j)
                {
                    j++;
                }
                if (sq[k][i].GetValue() == sq[k][j].GetValue())
                {
                    //console.log(k + "; " + i + " | " + k + "; " + j);
                    return false;
                }
            }
        }
    }

    //same box
    for (let x = 0; x < 3; x++)
    {
        for (let y = 0; y < 3; y++)
        {  
            for (let l = 0; l < 3; l++)
            {   
                for (let k = 0; k < 3; k++)
                {     
                    for (let i = 0; i < 3; i++) 
                    {
                        for (let j = 0; j < 3; j++)
                        {
                            if (j == 2 && y == 2) 
                            {
                                break;
                                
                            }
                            if (i == l && j == k)
                            {
                                j++;
                            }

                            a = l + (3 * x);
                            b = k + (3 * y);
                            c = i + (3 * x);
                            d = j + (3 * y);
                            if (sq[a][b].GetValue() == sq[c][d].GetValue())
                            {
                                //console.log("same box");
                                //console.log(l + "; " + k + " | " + i + "; " + j);
                                //console.log("oi");
                                return false;
                            }
                        }
                    }
                }
            }
        }
    }
    //console.log("oi");
    return true;
}

//Remake the row, columns and cell of the square with no number
function Remake(y)
{ 
    for (let i = 0; i < 9; i++)
    {
        Columns[y][i] = i + 1;
        fill(38, 39, 41);
        sq[i][y].Show();
        sq[i][y].ResetValue();
        //sq[i][y].ShowValue(true);
    }

    for (let i = 0; i < 9; i++)
    {
        for (let j = 0; j < 9; j++)
        {
            Rows[i][j] = j + 1;  
        }
    }

    let newY = floor(y/3);
    for (let i = 0; i < 9; i++)
    {
        for (let j = 0; j < 3; j++)
        {           
            Cells[j][newY][i] = i + 1;
        }
    }
}

//Generates the possible numbers to the current square
function Start(x, y)
{
    
    // for (let i = 0; i < 2; i++)
    // {
    //     Diagonals[i] = [];
    //     for (let j = 0; j < 9; j++) 
    //     {
    //         Diagonals[i][j] = j + 1;            
    //     } 
    // }

    //columns
    for (let i = 0; i < 9; i++)
    {
        if (sq[i][y].GetValue() != ' ' && sq[i][y].GetValue() != 0)
        {
            let a = sq[i][y].GetValue() - 1;
            Columns[y][a] = 0;
        }
    }

    //rows
    for (let i = 0; i < 9; i++)
    {
        if (sq[x][i].GetValue() != ' ' && sq[x][i].GetValue() != 0)
        {
            let a = sq[x][i].GetValue() - 1;
            Rows[x][a] = 0;
        }
    }

    //cell
    let SelectX = floor(x/3), SelectY = floor(y/3);
    //let newX = x - (3 * SelectX), newY = y - (3 * SelectY);
    for (let j = 0; j < 3; j++)
    {
        for (let i = 0; i < 3; i++)
        {
            let sqX = i + (3 * SelectX), sqY = j + (3 * SelectY);
            if (sqX == x && sqY == y)
            {
                if (x == 2 && y == 2)
                {
                    break;
                }
                else if (x == 2 && y < 2)
                {
                    sqY++;
                }
                else if (y == 2 && x < 2)
                {
                    sqX++;
                }
            }
            if (sq[sqX][sqY].GetValue() != ' ' && sq[sqX][sqY].GetValue() != 0)
            {
                let a = sq[i + 3 * SelectX][j + 3 * SelectY].GetValue() - 1;
                Cells[SelectX][SelectY][a] = 0;
            }
        }     
    }

    //diagonal
    // if (x == y)
    // {
    //     for (let i = 0; i < 9; i++)
    //     {
    //         if (sq[i][i].GetValue() != ' ' && sq[i][i].GetValue() != 0)
    //         {
    //             let a = sq[i][i].GetValue() - 1;
    //             Diagonals[0][a] = 0;
    //         }
    //     }
    // }
    // if (x + y == 8)
    // {
    //     for (let i = 0; i < 9; i++)
    //     {
    //         if (sq[8-i][i].GetValue() != ' ' && sq[8-i][i].GetValue() != 0)
    //         {
    //             let a = sq[8-i][i].GetValue() - 1;
    //             Diagonals[1][a] = 0;
    //         }           
    //     }
    // }

    //possible numbers
    let PosNum = [];
    let index = 0;
    for (let i = 0; i < 9; i++)
    {
        if (Rows[x][i] == Columns[y][i])
        {
            if (Cells[SelectX][SelectY][i] == Rows[x][i])
            {         
                // if (Diagonals[0][i] == Rows[x][i])
                // {            
                //     if (Diagonals[1][i] == Rows[x][i])
                //     {                       
                        if (Rows[x][i] != 0)
                        {
                            PosNum[index] = Rows[x][i];
                            index++;                 
                        }
                //         }
                // }
            }
        }
    }

    //check if the square has no possible numbers
    if (index == 0)
    {
        return false
    }

    //pick one of the possible numbers and show it on the screen
    if (index != 0) 
    {
        sq[x][y].SetValue(PosNum[round(random(0, index-1))]);
        sq[x][y].ShowValue(true);
    }

    return true;
}

//Fill the square
function SetNumbers()
{
    let err = 0, backup = -1;
    for (let i = 0; i < 9; i++) 
    {
        for (let j = 0; j < 9; j++)
        {
            //in case of no solution remake all the table
            if (err > 100 && backup == i)
            {
                i = -1;
                ArraysInit();
                break;
            }

            //try to remake the row if the square doesn't have any possibility
            if (!Start(j, i))
            {
                Remake(i);
                j = -1;
                backup = i;
                err++;
            }
        }
        err = 0;
    }

    //Blanks the squares
    let x = [];
    let y = [];
    //55
    for (let i = 0; i < 60; i++)
    {
        x[i] = round(random(0, 8));
        y[i] = round(random(0, 8));
        fill(38, 39, 41);
        sq[x[i]][y[i]].Show()
        sq[x[i]][y[i]].ResetValue();
        sq[x[i]][y[i]].SetImmutable();
    }
}

function Buttons()
{
    //Victory
    button[0] = createButton("Verify");
    button[0].style('background-color', '#555555');
    button[0].style('border', 'none');
    button[0].style('color', 'rgb(170, 170, 170)');
    button[0].style('padding', '15px 32px');
    button[0].style('text-align', 'center');
    button[0].style('text-decoration', 'none');
    button[0].style('display', 'inline-block');
    button[0].style('font-size', '16px');
    button[0].style('margin', '4px 2px');
    button[0].style('cursor', 'pointer');
    button[0].mousePressed(() =>{
        if (Victory())
        {
            fill(163, 59, 56);
            textSize(30);
            text("You Won!! Press ENTER to play again", width/2, 770);
            win = true;
        }
        else
        {
            fill(163, 59, 56);
            textSize(30);
            text("Not yet!", width/2, 770);
            setTimeout(() => {
                fill(38, 39, 41);
                strokeWeight(0);
                rect(width/2, 760, 100, 50);
            }, 1000);
        }
    });

    for (let i = 1; i < 10; i++)
    {
        button[i] = createButton(i);
        button[i].style('background-color', '#555555');
        button[i].style('border', 'none');
        button[i].style('color', 'rgb(170, 170, 170)');
        button[i].style('padding', '15px 32px');
        button[i].style('text-align', 'center');
        button[i].style('text-decoration', 'none');
        button[i].style('display', 'inline-block');
        button[i].style('font-size', '20px');
        button[i].style('margin', '4px 2px');
        button[i].style('cursor', 'pointer');
        button[i].mousePressed(() => 
        {
            if (!sq[countX][countY].GetImmutable()) 
            {
                fill(163, 59, 56);
                sq[countX][countY].Show();
                sq[countX][countY].SetValue(i);
                sq[countX][countY].ShowValue();
            }
        });     
    }
}

//Creates the sudoku
function setup()
{
    //configs
    createCanvas(720, 800);
    background(0);
    strokeWeight(2);
    rectMode(CENTER);
    textAlign(CENTER);
    background(38, 39, 41);
    
    //initialization of the arrays
    ArraysInit();

    //button creation
    Buttons();

    //creating the squares
    let i = 0, j = 0;   
    for (let w = 0; w < width; w += space)
    {
        sq[i] = [];
        for (let h = 0; h < height; h += space)
        {
            sq[i][j] = new square(w, h);
            fill(38, 39, 41);
            sq[i][j].Show();
            j++;
            //not fill the last line
            if (h == 640)
            {
                break;
            }
        }
        i++;
        j = 0;
    }

    SetNumbers();
}

//Make the lines thicker
function draw() 
{
    //console.log(window.innerHeight);
    button[0].position(window.innerWidth/2 - 50, 1300);
  	let s = 80;
    for (let i = 1; i < 10; i++)
    {
        button[i].position(window.innerWidth - window.innerWidth/9, 490 + s * (i-1));
        //window.innerWidth + 50
    }
    strokeWeight(6);
    line(240, 0, 240, 718);
    line(480, 0, 480, 718);
    line(0, 240, width, 240);
    line(0, 480, width, 480);
    strokeWeight(2);
}

//Check if any square is selected
function mouseClicked()
{
    strokeWeight(2);
    let i = 0, j = 0;

    //calculates where is being clicked
    while (mouseX >= i * space)
    {
        i++;
    }
    while (mouseY >= j * space)
    {
        j++;
    }

    countX = (i - 1);
    countY = (j - 1);
    if (countX > 8 || countX < 0)
    {
        countY = backupY;
        countX = backupX;

        return;
    }
    else if (countY > 8 || countY < 0)
    {
        countY = backupY;
        countX = backupX;

        return;
    }

    if (countX != backupX || countY != backupY)//check if the selected square is different to the previous
    {
        check = true;
    }
    else if(countX == backupX && countY == backupY && !check)//check if the selected square is the same to the previous and was deselected
    {
        check = true;
    }
    else if(countX == backupX && countY == backupY)//check if the selected square is the same to the previous
    {
        check = false;
    }

    if (check) 
    {
        //setting to white the previous square
        if (clicktimes > 0) 
        {
            //console.log("1");
            fill(38, 39, 41);
            sq[backupX][backupY].Show();
            if (sq[backupX][backupY].GetImmutable())
            {               
                sq[backupX][backupY].ShowValue(true);
            }
            else
            {
                sq[backupX][backupY].ShowValue();
            }
        }
        //setting to red the selected square
        fill(163, 59, 56);
        //console.log("2");
        sq[countX][countY].Show();
        if (sq[countX][countY].GetImmutable())
        {               
            sq[countX][countY].ShowValue(true);
        }
        else
        {
            sq[countX][countY].ShowValue();
        }
    }
    else if(!check && countX == backupX && countY == backupY)//setting to white if the new selection is the same as the previous
    {
        fill(38, 39, 41);
        //console.log("3");
        sq[countX][countY].Show();
        if (sq[countX][countY].GetImmutable())
        {               
            sq[countX][countY].ShowValue(true);
        }
        else
        {
            sq[countX][countY].ShowValue();
        }
    }

    backupX = countX;
    backupY = countY;
    clicktimes++;
}

//Gets the key pressed and set its value to the selected square
function keyPressed()
{    
    if (keyCode === ENTER)
    {
        if (win)
        {
            ArraysInit();
            SetNumbers();
            win = false;
            fill(38, 39, 41);
            strokeWeight(0);
            rect(width/2, 760, 600, 50);
            strokeWeight(2);
        }
    }
    
    if (check)
    {           
        // if (keyCode === RIGHT_ARROW)
        // {
        //     fill(38, 39, 41);
        //     sq[countX][countY].Show();
        //     sq[countX][countY].ShowValue();
        //     if (countX < 8)
        //     {
        //         countX++;
        //     }
        //     fill(163, 59, 56);
        //     sq[countX][countY].Show();
        //     sq[countX][countY].ShowValue();
        // }
        // else if (keyCode === LEFT_ARROW)
        // {
        //     fill(38, 39, 41);
        //     sq[countX][countY].Show();
        //     sq[countX][countY].ShowValue();
        //     if (countX > 0)
        //     {
        //         countX--;
        //     }
        //     fill(163, 59, 56);
        //     sq[countX][countY].Show();
        //     sq[countX][countY].ShowValue();
        // }
        // else if (keyCode === UP_ARROW)
        // {
        //     fill(38, 39, 41);
        //     sq[countX][countY].Show();
        //     sq[countX][countY].ShowValue();
        //     if (countY > 0)
        //     {
        //         countY--;
        //     }
        //     fill(163, 59, 56);
        //     sq[countX][countY].Show();
        //     sq[countX][countY].ShowValue();
        // }
        // else if (keyCode === DOWN_ARROW)
        // {
        //     fill(38, 39, 41);
        //     sq[countX][countY].Show();
        //     sq[countX][countY].ShowValue();
        //     if (countY < 8)
        //     {
        //         countY++;
        //     }
        //     fill(163, 59, 56);
        //     sq[countX][countY].Show();
        //     sq[countX][countY].ShowValue();
        // }

        if (key === '1' || key === '2' || key === '3' || key === '4' ||key === '5' || key === '6' ||key === '7' || key === '8' || key === '9')
        {
            if (!sq[countX][countY].GetImmutable()) 
            {               
                fill(163, 59, 56);
                sq[countX][countY].Show();
                sq[countX][countY].SetValue();
                sq[countX][countY].ShowValue();
            }
        }
        if (keyCode === BACKSPACE)
        {
            if (!sq[countX][countY].GetImmutable()) 
            {               
                fill(163, 59, 56);
                sq[countX][countY].Show();
                sq[countX][countY].ResetValue();
                sq[countX][countY].ShowValue();
            }
        }
    }
}
