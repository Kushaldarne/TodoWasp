import HttpError from '@wasp/core/HttpError.js'

export const createTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newTask = await context.entities.Task.create({
    data: {
      description: args.description,
      isDone: false,
      reminder: args.reminder,
      user: { connect: { id: context.user.id } }
    }
  });

  return newTask;
}

export const completeTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  const task = await context.entities.Task.findUnique({
    where: { id: args.id }
  });
  if (task.userId !== context.user.id) { throw new HttpError(403); }

  return context.entities.Task.update({
    where: { id: args.id },
    data: { isDone: true }
  });
}

export const deleteTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const task = await context.entities.Task.findUnique({
    where: { id: args.id }
  });
  if (!task) { throw new HttpError(400) };
  if (task.userId !== context.user.id) { throw new HttpError(400) };

  return context.entities.Task.delete({
    where: { id: args.id }
  });
}