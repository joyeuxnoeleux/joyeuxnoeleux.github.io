import pyautogui
import time
import keyboard

print("Autoclicker F démarré. Appuie sur 'Échap' pour arrêter.")

time.sleep(2)  # te laisse le temps de changer de fenêtre

while True:
    if keyboard.is_pressed("esc"):
        print("Arrêt.")
        break

    pyautogui.press("f")  # appuie sur F
    time.sleep(0.05)       # vitesse (0.05 sec)
