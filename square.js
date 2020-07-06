function square(x, y)
{
    let posX = x;
    let posY = y;
    let currentValue = ' ';
    let selected = false;
    let immutable = true;

    //Shows the square on the screen
    this.Show = function()
    {
        rect(space/2 + posX, space/2 + posY, space, space);
    }

    //Set the value of the square
    this.SetValue = function(a = ' ')
    {
        selected = true;
        if (a != ' ')
        {
            currentValue = a;
        }
        else
        {
            currentValue = key;
        }
    }

    //Resets the value of the square
    this.ResetValue = function()
    {
        currentValue = ' ';
    }

    //Shows the value of the square
    this.ShowValue = function(init = false)
    {
        if (init)
        {
            fill(100, 50, 100);
        }
        else
        {
            fill(150);
        }
        textSize(30);
        text(currentValue, (posX) + space/2, ((posY) + space/2) + 10);
    }

    //Returns the value of the square
    this.GetValue = function()
    {
        return currentValue;
    }

    this.SetImmutable = function()
    {
        immutable = false;
    }

    this.GetImmutable = function()
    {
        return immutable;
    }
}
