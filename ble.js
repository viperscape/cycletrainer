const { spawn } = require('child_process');

class BLE
{
    constructor(bus)
    {
        this.bus = bus;
        this.Spawn();
    }

    Spawn()
    {
        this.BLE = spawn('support/BLE_App', []);

        this.BLE.stdout.on('data', function (data) {
            try {
                let d = JSON.parse(data.toString());
                this.bus.send("data", d);
            }
            catch (err) {
                console.error("Parsing error:", err);
            }
        }.bind(this));

        this.BLE.stderr.on('data', (data) => {
            console.error(d);
        });

        this.BLE.on('exit', (code) => {
            console.log(`Child exited with code ${code}`);
        });
    }

    Restart()
    {
        this.BLE.stdin.pause();
        this.BLE.kill();
        this.Spawn();
    }
};

module.exports = BLE;