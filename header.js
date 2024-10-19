import figlet from 'figlet';

/**
 * Renders the header using figlet.
 * @returns A function that returns a Promise resolving to the rendered text.
 */
const renderHeader = () => {
    return async () => {
        return new Promise((resolve, reject) => {
            const Colors = {
                RESET: "\x1b[0m",
                YELLOW: "\x1b[33m",
                CYAN: "\x1b[36m",
                WHITE: "\x1b[37m"
            };
            
            process.stdout.write('\x1Bc');
            figlet('|| CREASY EVERYWHERE ||', (err, data) => {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    reject(err);
                    return;
                }
                console.log(Colors.YELLOW + data + Colors.RESET);
                console.log('\n\n');
                console.log(Colors.YELLOW + "RIVALZ AUTO MINT BOT" + Colors.RESET);
                console.log('\n\n');
                resolve();
            });
        });
    };
};

const header = renderHeader();
export default header;
