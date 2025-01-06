import prisma from "@/lib/db";

async function main() {
  const categories = [
    { name: "Technology" },
    { name: "Health" },
    { name: "Lifestyle" },
    { name: "Business" },
    { name: "Entertainment" },
    { name: "Politics" },
    { name: "Sports" },
    { name: "Travel" },
    { name: "Science" },
    { name: "Food & Drink" },
    { name: "Fashion" },
    { name: "Gaming" },
    { name: "Music" },
    { name: "Movies & TV" },
    { name: "Books" },
    { name: "History" },
    { name: "Culture" },
    { name: "Environment" },
    { name: "Other" },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  console.log("Categories created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
