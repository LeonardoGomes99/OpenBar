use std::env;
use std::fs::File;
use std::io::prelude::*;
use tauri_plugin_log::{LogTarget};

#[tauri::command]
fn open_executable(path: String) -> Result<(), String> {
    std::process::Command::new(path)
        .spawn()
        .map_err(|err| format!("Failed to start executable: {}", err))?;
    Ok(())
}

#[tauri::command]
fn print_type_of<T>(_: &T) {
    println!("{}", std::any::type_name::<T>())
}

#[tauri::command]
fn open_file() -> Result<String, String> {
    // Abre o arquivo em modo de leitura
    let mut file = match File::open("config.json") {
        Ok(file) => file,
        Err(err) => {
            return Err(format!("Erro ao abrir o arquivo: {}", err));
        }
    };

    let mut contents: String = String::new();
    match file.read_to_string(&mut contents) {
        Ok(_) => Ok(contents),
        Err(err) => Err(format!("Erro ao ler o arquivo: {}", err)),
    }
}

fn main() {    
    // let file_contents = open_myfile();
    // let jsonSting = file_contents.unwrap();
    // println!("{}", jsonSting);

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_executable, open_file])
        .plugin(tauri_plugin_log::Builder::default().targets([
          LogTarget::LogDir,
          LogTarget::Stdout,
          LogTarget::Webview,
      ]).build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
