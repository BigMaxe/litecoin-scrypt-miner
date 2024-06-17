from kivy.app import App
from kivy.lang import Builder

# Load the kv file
Builder.load_file('app/ui/app.kv')

from kivy.uix.boxlayout import BoxLayout
from kivy.clock import Clock
from miner.mining import start_mining, stop_mining, get_hashrate
import config

class MinerApp(App):
    def build(self):
        self.title = "Litecoin Scrypt Miner"
        return BoxLayout()  # The root widget is defined in the app.kv file

    def start_mining(self):
        mining_address = self.root.ids.address_input.text
        if mining_address:
            config.MINING_ADDRESS = mining_address
            self.root.ids.status_label.text = "Status: Mining"
            start_mining()
        else:
            self.root.ids.status_label.text = "Status: Enter a valid address"

    def stop_mining(self):
        self.root.ids.status_label.text = "Status: Stopped"
        stop_mining()

    def update_hashrate(self, dt):
        hashrate = get_hashrate()
        self.root.ids.progress_bar.value = hashrate
        self.root.ids.status_label.text = f"Status: Mining | Hashrate: {hashrate} H/s"

if __name__ == "__main__":
    MinerApp().run()
