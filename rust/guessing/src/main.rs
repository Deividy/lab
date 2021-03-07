use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    let secret_number = rand::thread_rng().gen_range(1, 420);
    loop {
        println!("Can you guess the number?");
        let mut guess = String::new();

        io::stdin()
            .read_line(&mut guess)
            .expect("#fail");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue
        };

        println!("Your guess: {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Aumentaaaaa"),
            Ordering::Greater => println!("Desceeeee"),
            Ordering::Equal => {
                println!("YOUUUUU WINNN!!");
                break;
            }
        }
    }
}
