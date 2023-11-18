document.getElementById('exerciseForm').addEventListener('submit',async function(event){
    event.preventDefault();
    
    const answer = document.getElementById('exerciseAnswer').value;
    
    try{
        const response = await fetch('http://localhost:8000/api/check_answer/',{
            method: 'POST',
            headers: {
                'content-Type':'application/json',
            },
            body: JSON.stringify({ answer })
        });
    
        const result = await response.json();
    
        document.getElementById('result').innerText = 'Result: ${result.result}';
    
        }catch (error){
            console.error('Error',error);
        }
    });