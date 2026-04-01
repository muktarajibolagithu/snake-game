
  // Rounded snake segments
  ctx.beginPath();
  ctx.roundRect(cell.x, cell.y, grid - 2, grid - 2, 6);
  ctx.fill();

  ctx.shadowBlur = 0;

  // Apple eaten
  if (cell.x === apple.x && cell.y === apple.y) {
    snake.maxCells++;
    apple.x = getRandomInt(0, 20) * grid;
    apple.y = getRandomInt(0, 20) * grid;
  }

  // Self collision
  for (let i = index + 1; i < snake.cells.length; i++) {
    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
      snake.x = 160;
      snake.y = 160;
      snake.cells = [];
      snake.maxCells = 4;
      snake.dx = grid;
      snake.dy = 0;
    }
  }
});
🍎 Bonus: Better Apple Style

Replace apple drawing with this:

ctx.fillStyle = "red";
ctx.shadowBlur = 15;
ctx.shadowColor = "red";
ctx.beginPath();
ctx.arc(apple.x + 10, apple.y + 10, 8, 0, Math.PI * 2);
ctx.fill();
ctx.shadowBlur = 0;
// Direction variables (make sure you already have these in your snake object)
let dx = 20;  // moving right by default
let dy = 0;

// Listen for key presses
document.addEventListener("keydown", function(event) {

  // UP
  if (event.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -20;
  }

  // DOWN
  else if (event.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = 20;
  }

  // LEFT
  else if (event.key === "ArrowLeft" && dx === 0) {
    dx = -20;
    dy = 0;
  }

  // RIGHT
  else if (event.key === "ArrowRight" && dx === 0) {
    dx = 20;
    dy = 0;
  }

});
ctx.fillStyle = "blue";
ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);
// Create gradient (gives 3D look)
let gradient = ctx.createRadialGradient(
  apple.x + 10, apple.y + 10, 2,
  apple.x + 10, apple.y + 10, 10
);

gradient.addColorStop(0, "#ff4d4d");  // light red
gradient.addColorStop(1, "#990000");  // dark red

// Draw apple body
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.arc(apple.x + 10, apple.y + 10, 9, 0, Math.PI * 2);
ctx.fill();


// 🍃 Add shine (light reflection)
ctx.fillStyle = "rgba(255,255,255,0.7)";
ctx.beginPath();
ctx.arc(apple.x + 6, apple.y + 6, 3, 0, Math.PI * 2);
ctx.fill();
let speed = 10; // bigger number = slower snake
let count = 0;
function loop() {
  requestAnimationFrame(loop);

  if (!running) return;

  // ⏳ control speed
  if (++count < speed) return;
  count = 0;

  // movement
  snake.x += snake.dx;
  snake.y += snake.dy;

  // draw your game...
}if (snake.x < 0) snake.x = canvas.width - grid;
if (snake.x >= canvas.width) snake.x = 0;
if (snake.y < 0) snake.y = canvas.height - grid;
if (snake.y >= canvas.height) snake.y = 0;


// 🌿 Add stem
ctx.strokeStyle = "#5a3d1a";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(apple.x + 10, apple.y + 2);
ctx.lineTo(apple.x + 10, apple.y - 4);
ctx.stroke();
let speed = 0; // bigger = slower (try 2-6)
let count = 2;
import pygame
import time
import random

# Initialize pygame
pygame.init()

# Screen size
width, height = 600, 400
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Snake Game")

# Colors
white = (255, 255, 255)
yellow = (255, 255, 102)
black = (0, 0, 0)
red = (213, 50, 80)
green = (0, 255, 0)
blue = (50, 153, 213)

# Snake settings
snake_block = 10

# Fonts
font_style = pygame.font.SysFont(None, 30)
score_font = pygame.font.SysFont(None, 35)

# Clock
clock = pygame.time.Clock()

# Difficulty selection
def choose_difficulty():
    print("Choose difficulty:")
    print("1 - Easy")
    print("2 - Medium")
    print("3 - Hard")
    
    choice = input("Enter choice (1/2/3): ")
    
    if choice == "1":
        return 10   # slow
    elif choice == "2":
        return 15   # medium
    elif choice == "3":
        return 25   # fast
    else:
        print("Invalid choice, defaulting to Medium.")
        return 15

snake_speed = choose_difficulty()

def draw_snake(snake_block, snake_list):
    for x in snake_list:
        pygame.draw.rect(screen, green, [x[0], x[1], snake_block, snake_block])

def show_score(score):
    value = score_font.render("Score: " + str(score), True, yellow)
    screen.blit(value, [10, 10])

def game_loop():
    game_over = False
    game_close = False

    x = width / 2
    y = height / 2

    x_change = 0
    y_change = 0

    snake_list = []
    snake_length = 1

    food_x = round(random.randrange(0, width - snake_block) / 10.0) * 10.0
    food_y = round(random.randrange(0, height - snake_block) / 10.0) * 10.0

    while not game_over:

        while game_close:
            screen.fill(blue)
            msg = font_style.render("Game Over! Press Q-Quit or C-Play Again", True, red)
            screen.blit(msg, [width / 6, height / 3])
            show_score(snake_length - 1)
            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_q:
                        game_over = True
                        game_close = False
                    if event.key == pygame.K_c:
                        game_loop()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    x_change = -snake_block
                    y_change = 0
                elif event.key == pygame.K_RIGHT:
                    x_change = snake_block
                    y_change = 0
                elif event.key == pygame.K_UP:
                    y_change = -snake_block
                    x_change = 0
                elif event.key == pygame.K_DOWN:
                    y_change = snake_block
                    x_change = 0

        # Check boundaries
        if x >= width or x < 0 or y >= height or y < 0:
            game_close = True

        x += x_change
        y += y_change
        screen.fill(black)

        pygame.draw.rect(screen, red, [food_x, food_y, snake_block, snake_block])

        snake_head = []
        snake_head.append(x)
        snake_head.append(y)
        snake_list.append(snake_head)

        if len(snake_list) > snake_length:
            del snake_list[0]

        # Check collision with self
        for segment in snake_list[:-1]:
            if segment == snake_head:
                game_close = True

        draw_snake(snake_block, snake_list)
        show_score(snake_length - 1)

        pygame.display.update()

        # Food collision
        if x == food_x and y == food_y:
            food_x = round(random.randrange(0, width - snake_block) / 10.0) * 10.0
            food_y = round(random.randrange(0, height - snake_block) / 10.0) * 10.0
            snake_length += 1

        clock.tick(snake_speed)

    pygame.quit()
    quit()

game_loop()
<select id="level">
  <option value="100">Easy</option>
  <option value="70">Medium</option>
  <option value="40">Hard</option>
</select