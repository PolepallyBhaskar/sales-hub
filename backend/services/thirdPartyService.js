const axios = require('axios');

exports.pushOrderToThirdParty = async (order) => {
    try {
        const response = await axios.post(
            'https://third-party-api.com/salesOrder',
            order,
            {
                headers: { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
            }
        );
        console.log('Order pushed successfully:', response.data);
    } catch (error) {
        console.error('Error pushing order:', error.message);
    }
};
