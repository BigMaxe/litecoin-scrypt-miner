from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.clock import Clock
from kivy.uix.textinput import TextInput
from kivy.uix.progressbar import ProgressBar

from miner.mining import start_mining, stop_mining, get_hashrate
import config

class MinerApp(App):
    def build(self):
        self.title = "Litecoin Scrypt Miner"

        # Main layout
        self.layout = BoxLayout(orientation='vertical', padding=10, spacing=10)

        # Label for mining status
        self.status_label = Label(text="Status: Idle", font_size='20sp')
        self.layout.add_widget(self.status_label)

        # Input for mining address
        self.address_input = TextInput(hint_text='Enter your mining address', multiline=False)
        self.layout.add_widget(self.address_input)

        # Progress bar for mining progress
        self.progress_bar = ProgressBar(max=1000)
        self.layout.add_widget(self.progress_bar)

        # Start and stop buttons
        self.start_button = Button(text='Start Mining', size_hint=(1, 0.2))
        self.start_button.bind(on_press=self.start_mining)
        self.layout.add_widget(self.start_button)

        self.stop_button = Button(text='Stop Mining', size_hint=(1, 0.2))
        self.stop_button.bind(on_press=self.stop_mining)
        self.layout.add_widget(self.stop_button)

        # Schedule a clock to update hashrate
        Clock.schedule_interval(self.update_hashrate, 1)

        return self.layout

    def start_mining(self, instance):
        mining_address = self.address_input.text
        if mining_address:
            config.MINING_ADDRESS = mining_address
            self.status_label.text = "Status: Mining"
            start_mining()
        else:
            self.status_label.text = "Status: Enter a valid address"

    def stop_mining(self, instance):
        self.status_label.text = "Status: Stopped"
        stop_mining()

    def update_hashrate(self, dt):
        hashrate = get_hashrate()
        self.progress_bar.value = hashrate
        self.status_label.text = f"Status: Mining | Hashrate: {hashrate} H/s"

if __name__ == "__main__":
    MinerApp().run()
