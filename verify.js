const main = async () => {
    try {
        const timestamp = Date.now();
        const email = `test${timestamp}@example.com`;
        const producerEmail = `producer${timestamp}@example.com`;

        // 1. Register Regular User (Seller)
        console.log(`Registering Seller: ${email}`);
        const regRes = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: 'password123', name: 'Test Seller' })
        });
        const regData = await regRes.json();
        const token = regData.access_token;

        // 2. Register Producer
        console.log(`Registering Producer: ${producerEmail}`);
        // Note: In a real app, role assignment would be admin-only or separate flow. 
        // For MVP, we might need to manually update role in DB or assume first user is admin.
        // But wait, the register DTO doesn't allow role. 
        // We will seed a producer via direct Prisma call if we could, but here we can't context switch easily.
        // Actually, let's just test that the ROUTING service doesn't crash if no producer.
        // OR better: Update the first user to be a PRODUCER via DB if possible? 
        // No, let's just verify the endpoint /stats works.
        // And verify state validation.

        // 3. Check Stats
        const statsRes = await fetch('http://localhost:3001/orders/stats', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Stats:', statsRes.status, await statsRes.json());

        // 4. Create Order
        const createOrdRes = await fetch('http://localhost:3001/orders', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                source: 'Manual',
                customerName: 'John Doe',
                customerEmail: 'john@doe.com',
                shippingAddress: '123 Main St',
                totalAmount: 100,
                items: [{ productName: 'Item 1', quantity: 2, price: 50 }]
            })
        });
        const order = await createOrdRes.json();
        console.log('Create Order:', createOrdRes.status, order);

        // 5. Test Invalid State Transition
        console.log('Testing Invalid State Transition...');
        const failStateRes = await fetch(`http://localhost:3001/orders/${order.id}/status`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'DELIVERED' }) // ID 1 CREATED -> DELIVERED (Invalid)
        });
        console.log('Invalid State Update:', failStateRes.status, await failStateRes.json());

        // 6. Test Valid State Transition
        console.log('Testing Valid State Transition...');
        const successStateRes = await fetch(`http://localhost:3001/orders/${order.id}/status`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'VALIDATED' }) // CREATED -> VALIDATED
        });
        console.log('Valid State Update:', successStateRes.status, await successStateRes.json());

        // 7. Test Webhook Logging (Simulate Error)
        console.log('Testing Webhook Error Logging...');
        const webhookRes = await fetch('http://localhost:3001/integrations/webhook/shopify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ invalid_payload: true }) // Should cause error in adapter or service if fields missing
            // Actually adapter is lenient, let's try unsupported platform
        });

        const failWebhookRes = await fetch('http://localhost:3001/integrations/webhook/unknown_platform', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        console.log('Webhook logging test (Unknown Platform):', failWebhookRes.status, await failWebhookRes.json());

    } catch (e) {
        console.error('Test Failed:', e);
    }
};
main();
