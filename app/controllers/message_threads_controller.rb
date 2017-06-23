class MessageThreadsController < ApiController

  def index
    message_threads = current_user.message_threads
    render json: message_threads, include: ['users'], status: :ok
  end

  def show
    message_thread = current_user.message_threads.includes(messages: [:user]).find(params[:id])
    render json: message_thread, include: ['messages'], status: :ok
  end

  def create
    if message_thread = MessageThreads::FindOrCreate.call(user_ids)
      render json: message_thread, status: :ok
    else
      # TODO: Render error json
    end
  end

  private

  def message_thread_params
    params.require(:message_thread).permit(user_ids: [])
  end

  def user_ids
    message_thread_params[:user_ids] << current_user.id.to_s
  end
end
