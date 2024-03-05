"use client";

export default function Home() {
  async function saveToNotion(name: string, email: string) {
    const url = '/submit-to-notion';
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to save data to Notion.');
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 items-center justify-between text-sm lg:flex">
        <div className="flex flex-col gap-3">
        <h1 className="text-xl">Notion Form</h1>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const name = (document.getElementById('name') as HTMLInputElement).value;
            const email = (document.getElementById('email') as HTMLInputElement).value;
            // Call the backend script to save data to Notion
            saveToNotion(name, email);
          }}
        >
          <div>
            <label className="flex flex-col gap-1">Name:
            <input type="text" id="name" name="name" required className="text-black bg-white border rounded p-1" />
            </label>
          </div>
          <div>
            <label className="flex flex-col gap-1">Email:
            <input type="email" id="email" name="email" required className="text-black bg-white border rounded p-1" />
            </label>
          </div>
          <div className="mt-3">
            <button type="submit" className="font-bold border px-3 rounded text-lg">Submit</button>
          </div>
          
          <p className="mt-6 text-xs">
            Project by <a href="https://notionmonkey.io">Notion Monkey</a>
          </p>

        </form>

        </div>
      </div>
    </main>
  );
}
