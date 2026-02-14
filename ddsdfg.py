from pynput import keyboard
from pynput.keyboard import Controller, Key
import time
PHRASE_TO_PASTE = input("phrase:")
keyboard_controller = Controller()
def on_press(key):
    try:
        if hasattr(key, 'char') and key.char == '1':
            keyboard_controller.press(Key.backspace)
            keyboard_controller.release(Key.backspace)
            while True:
                time.sleep(6)
                for i in range(len(PHRASE_TO_PASTE)):
                    keyboard_controller.press(Key.backspace)
                    keyboard_controller.release(Key.backspace)
                time.sleep(6)
                keyboard_controller.type(PHRASE_TO_PASTE)

    except Exception as e:
        print("Error:", e)
with keyboard.Listener(on_press=on_press) as listener:
    listener.join()