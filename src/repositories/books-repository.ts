import prisma from "../database";
import { CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";

export async function getBooks() {
  const books = await prisma.books.findMany();

  return books;
}

export async function getBook(id: number) {
  const book = await prisma.books.findUnique({ where: { id } });
  return book;
}

export async function createBook(book: CreateBook) {
  await prisma.books.create({ data: book });
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId, grade, review } = bookReview;
  await prisma.books.update({
    data: { grade, review, read: true },
    where: { id: bookId },
  });
}
